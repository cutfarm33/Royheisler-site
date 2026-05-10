import type { APIRoute } from 'astro';

export const prerender = false;

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-3.5';

const PROFESSIONAL_EDITOR_PROMPT = `
Role:
Act as a Senior Editor for a high-end trade publication like The Atlantic or a top-tier medical journal. Your task is to perform a heavy line edit and structural reorganization of the attached paper, which was written by a nurse about the veterinary industry.

Objective:
Transform this academic or clinical draft into a compelling, "ready-to-publish" article that balances medical authority with journalistic storytelling.

Stylistic Directives:

The Hook: Rewrite the introduction to be a "leadin"—start with a compelling anecdote, a surprising statistic, or a provocative question that immediately grabs the reader.

Structural Flow: Use the "Inverted Pyramid" approach. Front-load the most critical insights and conclusions.

Voice & Tone: Maintain the author’s authentic "nurse" perspective and expertise, but strip away academic "padding." Use active verbs, vary sentence length for rhythm, and eliminate passive voice.

Formatting: Break up long paragraphs. Add punchy, journalistic subheaders that move the narrative forward (avoid boring headers like "Introduction" or "Conclusion").

Jargon Management: If the author uses dense nursing or veterinary jargon, translate it into "elevated plain English" without losing the technical accuracy.

The "So What?": Ensure the transition between human healthcare (nursing) and animal healthcare (veterinary) is clear, logical, and impactful.

Output Instructions:
Provide a revised headline and a 30-word deck (the summary sentence under the headline).
Provide the full edited text.
After the text, provide a brief "Editor's Memo" explaining 3-4 major structural changes you made and why.

Return only valid JSON with the keys: headline, deck, editedText, editorMemo.
Do not include any additional keys, explanations, or metadata.
`;

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'Expected application/json' }, 415);
  }

  if (!CLAUDE_API_KEY) {
    return json({ ok: false, error: 'Missing Claude API key on the server.' }, 500);
  }

  let payload: { content?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  const content = String(payload.content ?? '').trim();
  if (!content) {
    return json({ ok: false, error: 'The content field is required.' }, 400);
  }

  try {
    const result = await fetchClaude(content);
    return json({ ok: true, ...result }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return json({ ok: false, error: message }, 500);
  }
};

async function fetchClaude(content: string) {
  const payload = {
    model: CLAUDE_MODEL,
    temperature: 0.2,
    max_tokens_to_sample: 2500,
    messages: [
      { role: 'system', content: PROFESSIONAL_EDITOR_PROMPT },
      {
        role: 'user',
        content: `Here is the author's draft. Edit it according to the instructions above and return only valid JSON.

---
${content}
---`,
      },
    ],
  };

  const response = await fetch('https://api.anthropic.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CLAUDE_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Claude error: ${response.status} ${text}`);
  }

  const data = await response.json();
  const raw = String(data?.choices?.[0]?.message?.content ?? '').trim();
  const parsed = parseJsonOutput(raw);

  if (!parsed.headline || !parsed.deck || !parsed.editedText || !parsed.editorMemo) {
    throw new Error('Claude returned invalid JSON structure.');
  }

  return parsed;
}

function parseJsonOutput(raw: string) {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Unable to extract JSON from Claude response.');
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    const cleaned = jsonMatch[0]
      .replace(/\n\s*\"/g, '\\n"')
      .replace(/\r/g, '')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    return JSON.parse(cleaned);
  }
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
