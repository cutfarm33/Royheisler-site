import type { APIRoute } from 'astro';

// Runs as a Vercel serverless function (not prerendered).
export const prerender = false;

/**
 * Read an environment variable at request time.
 *
 * A literal `process.env.FOO` can be statically replaced during the SSR build,
 * and a Vercel variable marked "Sensitive" does not exist at build time, so it
 * would be inlined as undefined and the key would never be visible at runtime.
 * The dynamic lookup defeats that substitution, and checks both the Vite and
 * Node views of the environment.
 */
function env(key: string): string | undefined {
  const viteEnv = import.meta.env as unknown as Record<string, string | undefined>;
  const nodeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env;
  return viteEnv?.[key] ?? nodeEnv?.[key];
}

const TO = () => env('CONTACT_TO') ?? 'hello@royheisler.com';
// Resend's shared sender works without domain verification, but only delivers
// to the address that owns the Resend account. Set CONTACT_FROM to an address
// on a domain you've verified to send from your own domain instead.
const FROM = () => env('CONTACT_FROM') ?? 'onboarding@resend.dev';

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'Expected application/json' }, 415);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const required = ['name', 'email', 'hiringFor', 'timeline', 'message'] as const;
  const missing = required.filter((k) => !payload[k] || String(payload[k]).trim() === '');
  if (missing.length > 0) {
    return json({ ok: false, error: `Missing fields: ${missing.join(', ')}` }, 400);
  }

  const email = String(payload.email ?? '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Invalid email' }, 400);
  }

  const key = env('RESEND_API_KEY');
  if (!key) {
    // Never report success for a message that was not sent, the visitor would
    // walk away believing it arrived.
    console.error('[contact] RESEND_API_KEY is not set; message NOT sent:', payload);
    return json(
      { ok: false, error: `Email isn't configured yet. Please write to ${TO()} directly.` },
      503,
    );
  }

  const name = String(payload.name);
  const text = [
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Hiring for:  ${payload.hiringFor}`,
    `Timeline:    ${payload.timeline}`,
    '',
    String(payload.message),
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Roy Heisler Site <${FROM()}>`,
        to: [TO()],
        reply_to: email,
        subject: `Enquiry from ${name}: ${payload.hiringFor}`,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[contact] Resend rejected the send:', res.status, detail, payload);
      return json(
        { ok: false, error: `Couldn't send that. Please write to ${TO()} directly.` },
        502,
      );
    }
  } catch (err) {
    console.error('[contact] send threw:', err, payload);
    return json(
      { ok: false, error: `Couldn't send that. Please write to ${TO()} directly.` },
      502,
    );
  }

  return json({ ok: true }, 200);
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
