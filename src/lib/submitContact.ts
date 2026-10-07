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
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });
  const result: unknown = response.headers.get('content-type')?.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = isRecord(result) && typeof result.error === 'string'
      ? result.error
      : 'We could not send your message. Please try again.';
    throw new Error(error);
  }
};
