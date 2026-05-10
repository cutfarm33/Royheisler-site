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

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const content = String(payload.content ?? '').trim();
  if (!content) {
    return new Response(JSON.stringify({ ok: false, error: 'The content field is required.' }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const apiKey = env.CLAUDE_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing Claude API key.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  try {
    const result = await fetchClaude(apiKey, content);
    return new Response(JSON.stringify({ ok: true, ...result }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function fetchClaude(apiKey: string, content: string) {
  const response = await fetch('https://api.anthropic.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'claude-3.5',
      temperature: 0.2,
      max_tokens_to_sample: 2500,
      messages: [
        { role: 'system', content: PROFESSIONAL_EDITOR_PROMPT },
        { role: 'user', content: `Here is the author's draft. Edit it according to the instructions above and return only valid JSON.\n\n---\n${content}\n---` },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Claude error: ${response.status} ${text}`);
  }

  const data = await response.json();
  const raw = String(data?.choices?.[0]?.message?.content ?? '').trim();
  return parseJsonOutput(raw);
}

function parseJsonOutput(raw: string) {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Unable to extract JSON from Claude response.');
  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    const cleaned = jsonMatch[0]
      .replace(/\n\s*\"/g, '\\n"')
      .replace(/\r/g, '')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    return JSON.parse(cleaned);
  }
}
