const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";

const FALLBACK_FREE_MODELS = [
  "google/gemma-3-27b-it:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "microsoft/phi-3-mini-128k-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free"
];

const personas = {
  Goblin: {
    title: "Chaotic Goblin Executive",
    vibe: "impulsive, mischievous, intensely committed to bad ideas with excellent confidence",
    companions: ["Midnight Spreadsheet Wizard", "Mall Food Court Prophet", "Cursed Camp Counselor"]
  },
  Wizard: {
    title: "Midnight Spreadsheet Wizard",
    vibe: "hyper-specific, analytical, weirdly powerful, secretly thriving in systems nobody else understands",
    companions: ["Chaotic Goblin Executive", "Emergency Disco Mayor", "Tiny Crisis Philosopher"]
  },
  Prophet: {
    title: "Mall Food Court Prophet",
    vibe: "observant, theatrical, casually profound, capable of turning nonsense into meaning",
    companions: ["Tiny Crisis Philosopher", "Cursed Camp Counselor", "Emergency Disco Mayor"]
  },
  Mayor: {
    title: "Emergency Disco Mayor",
    vibe: "charismatic, loud in the useful way, socially unstoppable, built for turning disaster into a party",
    companions: ["Chaotic Goblin Executive", "Mall Food Court Prophet", "Tiny Crisis Philosopher"]
  },
  Philosopher: {
    title: "Tiny Crisis Philosopher",
    vibe: "self-aware, dramatic, emotionally articulate, one step away from writing a manifesto in the Notes app",
    companions: ["Midnight Spreadsheet Wizard", "Mall Food Court Prophet", "Cursed Camp Counselor"]
  },
  Counselor: {
    title: "Cursed Camp Counselor",
    vibe: "supportive, chaotic-neutral, weirdly calming, prepared to guide a group through nonsense with a flashlight",
    companions: ["Emergency Disco Mayor", "Tiny Crisis Philosopher", "Chaotic Goblin Executive"]
  }
};

// Free model list cache — refreshed every hour
let modelsCache = null;
let modelsCacheTime = 0;
const MODELS_CACHE_TTL = 60 * 60 * 1000;

// Rate-limited models — each entry maps model id -> timestamp when it was exhausted
const exhaustedModels = new Map();
const EXHAUSTED_TTL = 60 * 60 * 1000;

async function fetchFreeModels(apiKey) {
  const now = Date.now();
  if (modelsCache && now - modelsCacheTime < MODELS_CACHE_TTL) {
    return modelsCache;
  }

  try {
    const response = await fetch(OPENROUTER_MODELS_URL, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    if (!response.ok) {
      console.warn(`[openrouter] Failed to fetch models (${response.status}), using fallback list`);
      return FALLBACK_FREE_MODELS;
    }

    const data = await response.json();
    const freeModels = data.data
      .filter(
        (model) =>
          model.id.endsWith(":free") ||
          (model.pricing?.prompt === "0" && model.pricing?.completion === "0")
      )
      .map((model) => model.id);

    if (freeModels.length === 0) {
      console.warn("[openrouter] No free models found in API response, using fallback list");
      return FALLBACK_FREE_MODELS;
    }

    console.log(`[openrouter] Loaded ${freeModels.length} free models`);
    modelsCache = freeModels;
    modelsCacheTime = now;
    return freeModels;
  } catch (error) {
    console.warn(`[openrouter] Error fetching models: ${error.message}, using fallback list`);
    return FALLBACK_FREE_MODELS;
  }
}

function isExhausted(modelId) {
  const timestamp = exhaustedModels.get(modelId);
  if (!timestamp) return false;
  if (Date.now() - timestamp > EXHAUSTED_TTL) {
    exhaustedModels.delete(modelId);
    return false;
  }
  return true;
}

function isRateLimitError(status, data) {
  if (status === 429) return true;
  if (data?.error?.code === 429) return true;
  const msg = data?.error?.message?.toLowerCase() ?? "";
  return msg.includes("rate limit") || msg.includes("quota") || msg.includes("too many requests");
}

async function callWithModelFallback(apiKey, messages, referer) {
  const allFreeModels = await fetchFreeModels(apiKey);
  let available = allFreeModels.filter((id) => !isExhausted(id));

  if (available.length === 0) {
    console.warn("[openrouter] All models exhausted, clearing exhausted list and retrying");
    exhaustedModels.clear();
    available = allFreeModels;
  }

  for (const model of available) {
    console.log(`[openrouter] Trying model: ${model}`);

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": referer || "https://localhost",
        "X-Title": "Ridiculous Personality Audit"
      },
      body: JSON.stringify({ model, messages })
    });

    const data = await response.json();

    if (isRateLimitError(response.status, data)) {
      console.warn(`[openrouter] Model ${model} is rate-limited, switching to next`);
      exhaustedModels.set(model, Date.now());
      continue;
    }

    if (!response.ok) {
      throw new Error(`OpenRouter error (${response.status}): ${data?.error?.message ?? JSON.stringify(data)}`);
    }

    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("The model returned an empty response.");
    }

    console.log(`[openrouter] Success with model: ${model}`);
    return content;
  }

  throw new Error("All available free models are currently rate-limited. Please try again later.");
}

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

  const personaList = Object.entries(personas)
    .map(([key, p]) => `- ${key} ("${p.title}"): ${p.vibe}`)
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
  "summary": "2-3 sentence funny summary of who they are",
  "matchStyle": "1 sentence describing their social or chaotic energy",
  "traits": ["trait 1", "trait 2", "trait 3"],
  "analysisNotes": "Short paragraph explaining why the answers point to this result",
  "signatureMotto": "One absurd quote or motto that fits them",
  "dimensions": [
    { "label": "Chaos Tolerance", "descriptor": "2-4 word funny descriptor", "score": 0 },
    { "label": "Confidence", "descriptor": "2-4 word funny descriptor", "score": 0 },
    { "label": "Social Voltage", "descriptor": "2-4 word funny descriptor", "score": 0 },
    { "label": "Depth", "descriptor": "2-4 word funny descriptor", "score": 0 }
  ]
}

The "dimensions" array must use exactly these four labels in this order: "Chaos Tolerance", "Confidence", "Social Voltage", "Depth". For each, write a short funny descriptor (2-4 words) and a score from 0 to 100 reflecting how strongly that trait appears in the user's answers.

Do not include markdown fences. Do not add any fields beyond the schema above.
  `.trim();

  const messages = [
    { role: "system", content: "You are a precise but funny personality classifier that always returns valid JSON." },
    { role: "user", content: prompt }
  ];

  const referer = req.headers.referer || req.headers.origin || "https://localhost";

  try {
    const content = await callWithModelFallback(apiKey, messages, referer);
    const parsed = JSON.parse(content);

    // Validate typeKey and inject predefined title + companions — AI must not invent these
    const typeKey = personas[parsed.typeKey] ? parsed.typeKey : "Philosopher";
    const persona = personas[typeKey];

    return res.status(200).json({
      ...parsed,
      typeKey,
      typeTitle: persona.title,
      bestMatches: persona.companions
    });
  } catch (error) {
    console.error("[openrouter] Handler error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
