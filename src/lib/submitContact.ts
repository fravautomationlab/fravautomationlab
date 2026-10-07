export interface ContactSubmission {
  formType: 'about-page' | 'contact-modal';
  name: string;
  email: string;
  company?: string;
  focus?: string;
  timeline?: string;
  message?: string;
  website: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const submitContact = async (submission: ContactSubmission) => {
  let response: Response;
  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
  } catch (error) {
    throw new Error('We could not send your message. Please check your connection and try again.');
  }

  let result: unknown;
  try {
    result = response.headers.get('content-type')?.includes('application/json')
      ? await response.json()
      : null;
  } catch {
    result = null;
  }

  if (!response.ok) {
    const error = isRecord(result) && typeof result.error === 'string'
      ? result.error
      : 'We could not send your message. Please try again.';
    throw new Error(error);
  }

  if (!isRecord(result) || result.success !== true) {
    throw new Error('We could not confirm that your message was sent. Please try again.');
  }
};
