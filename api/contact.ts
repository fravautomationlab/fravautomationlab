interface ContactRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
}

interface ContactResponse {
  status: (code: number) => ContactResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
}

interface ContactPayload {
  formType: 'about-page' | 'contact-modal';
  name: string;
  email: string;
  company?: string;
  focus?: string;
  timeline?: string;
  message?: string;
  website?: string;
}

const maxRequestBytes = 12_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readText = (
  value: unknown,
  field: string,
  maxLength: number,
  required = false,
  allowLineBreaks = false
) => {
  if (value === undefined && !required) return '';
  if (typeof value !== 'string') throw new Error(`Invalid ${field}.`);

  const text = value.trim();
  const controlCharacters = allowLineBreaks
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
    : /[\r\n\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
  if ((required && !text) || text.length > maxLength || controlCharacters.test(text)) {
    throw new Error(`Invalid ${field}.`);
  }
  return text;
};

const respond = (response: ContactResponse, status: number, body: unknown) => {
  response.status(status);
  response.setHeader('Cache-Control', 'no-store');
  response.json(body);
};

export default async function handler(request: ContactRequest, response: ContactResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    respond(response, 405, { error: 'Method not allowed.' });
    return;
  }

  const contentType = request.headers['content-type'];
  if (typeof contentType !== 'string' || !contentType.toLowerCase().startsWith('application/json')) {
    respond(response, 415, { error: 'Send the form as JSON.' });
    return;
  }

  const contentLength = request.headers['content-length'];
  if (typeof contentLength === 'string' && Number(contentLength) > maxRequestBytes) {
    respond(response, 413, { error: 'The form submission is too large.' });
    return;
  }

  if (!isRecord(request.body)) {
    respond(response, 400, { error: 'Invalid form submission.' });
    return;
  }

  let payload: ContactPayload;
  try {
    const formType = request.body.formType;
    if (formType !== 'about-page' && formType !== 'contact-modal') {
      throw new Error('Invalid form type.');
    }

    payload = {
      formType,
      name: readText(request.body.name, 'name', 120, true),
      email: readText(request.body.email, 'email', 254, true),
      company: readText(request.body.company, 'company', 160),
      focus: readText(request.body.focus, 'service selection', 40),
      timeline: readText(request.body.timeline, 'timeline', 120),
      message: readText(request.body.message, 'message', 5_000, false, true),
      website: readText(request.body.website, 'website', 200),
    };
    if (payload.focus && !['WEB', 'AUTOMATION', 'BOTH'].includes(payload.focus)) {
      throw new Error('Invalid service selection.');
    }
  } catch (error) {
    respond(response, 400, {
      error: error instanceof Error ? error.message : 'Invalid form submission.',
    });
    return;
  }

  if (!emailPattern.test(payload.email)) {
    respond(response, 400, { error: 'Enter a valid email address.' });
    return;
  }

  if (payload.website) {
    respond(response, 200, { success: true });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    console.error('Contact form email configuration is incomplete.');
    respond(response, 503, { error: 'Email delivery is not configured yet. Please email us directly.' });
    return;
  }

  const details = [
    `Form: ${payload.formType}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company && `Company: ${payload.company}`,
    payload.focus && `Service: ${payload.focus}`,
    payload.timeline && `Timeline: ${payload.timeline}`,
    '',
    payload.message || '(No project details provided.)',
  ].filter((line): line is string => Boolean(line));

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: payload.email,
      subject: `New ${payload.formType === 'about-page' ? 'website' : 'contact'} inquiry`,
      text: details.join('\n'),
    }),
  });

  if (!resendResponse.ok) {
    console.error(`Contact form email provider returned status ${resendResponse.status}.`);
    respond(response, 502, { error: 'We could not send your message. Please try again or email us directly.' });
    return;
  }

  respond(response, 200, { success: true });
}
