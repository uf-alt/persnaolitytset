const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "meta-llama/llama-3.3-70b-instruct:free";

const personaVibes = {
  Goblin: "impulsive, mischievous, intensely committed to bad ideas with excellent confidence",
  Wizard: "hyper-specific, analytical, weirdly powerful, secretly thriving in systems nobody else understands",
  Prophet: "observant, theatrical, casually profound, capable of turning nonsense into meaning",
  Mayor: "charismatic, loud in the useful way, socially unstoppable, built for turning disaster into a party",
  Philosopher: "self-aware, dramatic, emotionally articulate, one step away from writing a manifesto in the Notes app",
  Counselor: "supportive, chaotic-neutral, weirdly calming, prepared to guide a group through nonsense with a flashlight"
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { writtenResponses } = req.body;
  if (!Array.isArray(writtenResponses) || writtenResponses.length === 0) {
    return res.status(400).json({ error: "Invalid request body." });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on the server." });
  }

  const personaList = Object.entries(personaVibes)
    .map(([key, vibe]) => `- ${key}: ${vibe}`)
    .join("\n");

  const answerList = writtenResponses
    .map((item, index) => `${index + 1}. ${item.question}\nAnswer: ${item.answer}`)
    .join("\n\n");

  const prompt = `
You are classifying a user from an outrageous comedy personality quiz into one of these personas:
${personaList}

The result should feel funny, specific, and shareable, not generic. Lean into absurdity, but make the reasoning believable from the user's writing style and choices.

Quiz answers:
${answerList}

Return valid JSON with this exact schema:
{
  "typeKey": "Goblin | Wizard | Prophet | Mayor | Philosopher | Counselor",
  "typeTitle": "funny persona title",
  "summary": "2-3 sentence funny summary of who they are",
  "matchStyle": "1 sentence describing their social or chaotic energy",
  "traits": ["trait 1", "trait 2", "trait 3"],
  "bestMatches": ["funny compatible type 1", "funny compatible type 2", "funny compatible type 3"],
  "analysisNotes": "Short paragraph explaining why the answers point to this result",
  "signatureMotto": "One absurd quote or motto that fits them"
}

Do not include markdown fences.
  `.trim();

  const openRouterResponse = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": req.headers.referer || req.headers.origin || "https://localhost",
      "X-Title": "Ridiculous Personality Audit"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are a precise but funny personality classifier that always returns valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!openRouterResponse.ok) {
    const errorText = await openRouterResponse.text();
    return res.status(openRouterResponse.status).json({ error: `OpenRouter returned ${openRouterResponse.status}: ${errorText}` });
  }

  const data = await openRouterResponse.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    return res.status(500).json({ error: "The model returned an empty response." });
  }

  return res.status(200).json(JSON.parse(content));
}
