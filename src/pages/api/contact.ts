import type { APIRoute } from 'astro';

// Runs as a Vercel serverless function (not prerendered).
export const prerender = false;

/**
 * STUB endpoint. Logs the payload server-side and returns 200.
 * Before going live, wire this up to a real provider:
 *   - Resend:    https://resend.com (recommended for simple transactional mail)
 *   - Formspree: https://formspree.io (no backend code at all)
 *   - SendGrid / Postmark also fine.
 * Replace the console.log with the actual send + error handling.
 */
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

  // TODO: wire to Resend / Formspree / SendGrid before production.
  console.log('[contact] received:', payload);

  return json({ ok: true }, 200);
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
