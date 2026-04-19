
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

const questions = [
  {
    prompt: "You wake up and discover that every chair in your city has been replaced with a table and likewise. What is your first move?",
    placeholder: "Explain your response like this is an annoying but manageable Tuesday.",
    options: [
      "Immediately sit on a table just to prove I have adapted and everyone else is slow.",
      "Spend twenty minutes figuring out if there is a pattern before I commit to anything.",
      "Accept it as a sign that the universe needed a reset and proceed accordingly.",
      "Announce an emergency community meeting and somehow make this a whole event."
    ]
  },
  {
    prompt: "A mysterious wizard offers you one superpower, with the catch that they will try their best to add one condition that sabotages you. Which one are you picking?",
    placeholder: "There's probably no good answer to this.",
    options: [
      "Teleportation. Whatever cursed condition gets added, I will negotiate around it.",
      "Perfect memory. The catch will be annoying but I will find a way to document it.",
      "The ability to say exactly what someone needs to hear. Worth any price.",
      "Invisibility. Even if it only works on Tuesdays I will structure my entire life around that."
    ]
  },
  {
    prompt: "Would you rather slobber and spit into somebody's food, or eat food that somebody spat in? You can pick who spits / has their food spat on, but explain.",
    placeholder: "Probably the freakiest question here.",
    options: [
      "Spit in theirs. I choose a stranger, commit to the bit, and never speak of it again.",
      "Eat theirs. I pick someone with obviously high personal standards and move on.",
      "Eat theirs. The person I choose would consider it a compliment.",
      "Neither. I would rather starve than be the villain in someone else's food story."
    ]
  },
  {
    prompt: "If your personality had a warning label printed on the side, what would it say?",
    placeholder: "Go for funny, too honest, or both.",
    options: [
      "Warning: will escalate any minor inconvenience into a full narrative arc.",
      "Warning: has already optimized a solution for a problem you have not described yet.",
      "Warning: will absolutely make this your problem too and you will enjoy it.",
      "Warning: vibes with everything, including things that should not be vibed with."
    ]
  },
  {
    prompt: "An alien asks you to explain Earth using only one object, one snack, and one emotional breakdown. What are you choosing?",
    placeholder: "Tell the alien exactly what kind of mess we are.",
    options: [
      "Object: a receipt. Snack: gas station sushi. Breakdown: sending a message and immediately rereading it.",
      "Object: a spreadsheet. Snack: sad desk lunch. Breakdown: missing something important by four minutes.",
      "Object: a group chat. Snack: whatever was free at the event. Breakdown: the Sunday dread.",
      "Object: a sticky note. Snack: something cursed but familiar. Breakdown: being perceived by someone who gets it."
    ]
  },
  {
    prompt: "What tiny inconvenience turns you into a full Shakespearean tragedy character?",
    placeholder: "Pick something petty and defend your drama.",
    options: [
      "When someone stops walking right at the entrance to somewhere.",
      "When a page takes more than two seconds to load during something important.",
      "When someone misuses a word confidently in front of a group.",
      "When my headphone wire catches on a doorknob at full stride."
    ]
  },
  {
    prompt: "You are now legally required to win a talent show using a skill you absolutely do not have. What is the plan?",
    placeholder: "Describe how you would compensate with confidence, delusion, or props.",
    options: [
      "Enter with a fog machine and maximum staging. The spectacle carries you further than it should.",
      "Develop the skill in the next eighteen hours through unhinged obsessive dedication.",
      "Perform with such specific confidence that the audience starts to doubt themselves.",
      "Tell a story about almost having the talent. Make it deeply compelling. Take the loss gracefully."
    ]
  },
  {
    prompt: "A friend says, 'Be honest, what is your weirdest strength?' What do you tell them?",
    placeholder: "Answer like you have already thought about this too much.",
    options: [
      "I can make any bad plan sound like a calculated and deliberate creative risk.",
      "I can identify the exact point where a system is failing before anyone else notices.",
      "I can walk into any room and make the most anxious person feel immediately less anxious.",
      "I can read the exact emotional temperature of a situation in under thirty seconds."
    ]
  },
  {
    prompt: "If your brain had a group chat name, what would it be and who in there is causing the most problems?",
    placeholder: "Name the internal chaos. We want lore.",
    options: [
      "Chaos In Progress. The loudest member keeps proposing side quests at two in the morning.",
      "Optimization Pending. The analyst has been blocking sleep approvals for three weeks.",
      "Everything Means Something. The conspiracy theorist is currently presenting a seventeen-slide deck.",
      "Urgent But Make It Weird. The overcommunicator is drafting a follow-up to the follow-up."
    ]
  },
  {
    prompt: "You get to leave the user with one wildly unhelpful life motto. What is it?",
    placeholder: "Make it memorable enough to be quoted against your will.",
    options: [
      "If it is a bad idea, at least make it a great story.",
      "There is always a more efficient way to do this wrong.",
      "The vibes were never really yours to control.",
      "If nobody knows what is happening, you are technically in charge."
    ]
  }
];

const exampleResponses = [
  "I would immediately sit on a table just to establish that I am fine with this. Then I would spend the rest of the morning figuring out whether everyone else is adapting or panicking, and adjust my posture accordingly.",
  "I would choose the power to know exactly when a microwave will finish without looking. It is useless in every important sense, but I would become unbearable about how good I am at it.",
  "I would eat the food. I would choose someone whose general hygiene situation I trust, make that known upfront so it is not weird later, and then just move on. The alternative involves me being the villain of someone else's evening and I do not have the energy.",
  "Warning: may turn minor inconveniences into philosophy, bits, or both. Exposure can lead to secondhand confidence and sudden side quests.",
  "Object: a receipt. Snack: stale fries. Emotional breakdown: saying 'it is what it is' eight times before buying a candle. That is Earth.",
  "When my headphone wire catches on a doorknob, I instantly become a Victorian widow with a doomed inheritance and no allies.",
  "I would enter with zero talent and maximum staging. There would be a smoke machine, a cape, and the strong implication that something impressive is about to happen, which honestly carries you farther than it should.",
  "My weirdest strength is making chaotic situations sound intentional. I can rebrand a bad plan into a narrative arc before anyone has time to stop me.",
  "The group chat is called Urgent But Make It Weird. The biggest problem is the version of me who thinks every passing thought deserves a three-phase rollout plan.",
  "If the vibe is wrong, become more specific."
];

const fallbackDimensions = {
  Goblin: [
    { label: "Chaos Tolerance", descriptor: "Enthusiastically feral", score: 94 },
    { label: "Confidence", descriptor: "Delusionally high", score: 88 },
    { label: "Social Voltage", descriptor: "Chaotically loud", score: 76 },
    { label: "Depth", descriptor: "Confidently shallow", score: 31 }
  ],
  Wizard: [
    { label: "Chaos Tolerance", descriptor: "Systemized chaos only", score: 44 },
    { label: "Confidence", descriptor: "In their domain: absolute", score: 91 },
    { label: "Social Voltage", descriptor: "Selectively intense", score: 53 },
    { label: "Depth", descriptor: "Incomprehensibly deep", score: 97 }
  ],
  Prophet: [
    { label: "Chaos Tolerance", descriptor: "Thrives in the mess", score: 72 },
    { label: "Confidence", descriptor: "Cosmically assured", score: 85 },
    { label: "Social Voltage", descriptor: "Theatrical but grounded", score: 79 },
    { label: "Depth", descriptor: "Profoundly unhinged", score: 89 }
  ],
  Mayor: [
    { label: "Chaos Tolerance", descriptor: "Turns it into a party", score: 81 },
    { label: "Confidence", descriptor: "Unstoppably loud", score: 96 },
    { label: "Social Voltage", descriptor: "Dangerously charming", score: 98 },
    { label: "Depth", descriptor: "Wide but fast", score: 58 }
  ],
  Philosopher: [
    { label: "Chaos Tolerance", descriptor: "Internally managed", score: 62 },
    { label: "Confidence", descriptor: "Dramatically uncertain", score: 67 },
    { label: "Social Voltage", descriptor: "Intense one-on-one", score: 61 },
    { label: "Depth", descriptor: "Manifesto-level deep", score: 95 }
  ],
  Counselor: [
    { label: "Chaos Tolerance", descriptor: "Calm in the storm", score: 77 },
    { label: "Confidence", descriptor: "Quietly unshakeable", score: 83 },
    { label: "Social Voltage", descriptor: "Warm and steady", score: 86 },
    { label: "Depth", descriptor: "Deep but accessible", score: 88 }
  ]
};

const fallbackSignals = {
  Goblin: ["chaos", "chaotic", "problem", "mischief", "bad idea", "impulsive", "goblin", "feral", "side quest", "unhinged"],
  Wizard: ["plan", "system", "organized", "specific", "spreadsheet", "analysis", "strategy", "optimize", "process", "structure"],
  Prophet: ["meaning", "prophecy", "dramatic", "theater", "lore", "symbol", "observe", "story", "vision", "poetic"],
  Mayor: ["party", "crowd", "host", "energy", "charisma", "people", "loud", "performance", "fun", "momentum"],
  Philosopher: ["feelings", "existential", "overthink", "manifesto", "self-aware", "spiral", "deep", "honest", "emotional", "reflection"],
  Counselor: ["support", "guide", "calm", "help", "comfort", "steady", "flashlight", "friend", "care", "grounded"]
};

const state = {
  currentQuestionIndex: 0,
  answers: new Array(questions.length).fill("")
};

const quizForm = document.querySelector("#quiz-form");
const submitButton = document.querySelector("#submit-button");
const randomizeButton = document.querySelector("#randomize-button");
const resultCard = document.querySelector("#result-card");
const statusCard = document.querySelector("#status-card");
const resultType = document.querySelector("#result-type");
const resultMatch = document.querySelector("#result-match");
const resultSummary = document.querySelector("#result-summary");
const resultTraits = document.querySelector("#result-traits");
const resultMatches = document.querySelector("#result-matches");
const scoreBreakdown = document.querySelector("#score-breakdown");

renderQuestion();
updateStatus();

randomizeButton.addEventListener("click", () => {
  state.answers = [...exampleResponses];
  renderQuestion();
  setStatus("Example chaos loaded. Swipe through the questions and edit anything you want before analyzing.");
});

quizForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  persistCurrentAnswer();

  const writtenResponses = getWrittenResponses();
  if (writtenResponses.some((response) => !response.answer)) {
    setStatus("Every question needs an answer before the AI can diagnose your nonsense.");
    return;
  }

  submitButton.disabled = true;
  setStatus("Sending your ridiculous answers to the AI for classification...");

  try {
    const aiResult = await classifyWithOpenRouter(writtenResponses);

    renderResult(aiResult, aiResult.analysisNotes || "OpenRouter analyzed the written responses directly.");
    setStatus("Classification complete. Your personality has been professionally misinterpreted.");
  } catch (error) {
    const fallback = buildFallbackResult(writtenResponses);
    renderResult(fallback, fallback.analysisNotes);
    setStatus(`OpenRouter failed, so the local nonsense detector took over instead. ${error.message}`);
  } finally {
    submitButton.disabled = false;
  }
});

function renderQuestion() {
  const question = questions[state.currentQuestionIndex];
  const answer = state.answers[state.currentQuestionIndex] || "";
  const isFirst = state.currentQuestionIndex === 0;
  const isLast = state.currentQuestionIndex === questions.length - 1;

  const optionsHtml = question.options
    .map((option, i) => {
      const selected = answer === option ? "is-selected" : "";
      return `<button class="option-button ${selected}" type="button" data-option="${i}">${escapeHtml(option)}</button>`;
    })
    .join("");

  quizForm.innerHTML = `
    <section class="question-card solo-card">
      <div class="quiz-progress-row">
        <div>
          <p class="eyebrow">Question ${state.currentQuestionIndex + 1} / ${questions.length}</p>
          <h2 class="question-heading">Ridiculous Personality Audit</h2>
        </div>
        <div class="question-number">${state.currentQuestionIndex + 1}</div>
      </div>
      <div class="progress-track" aria-hidden="true">
        <span class="progress-fill" style="width: ${((state.currentQuestionIndex + 1) / questions.length) * 100}%"></span>
      </div>
      <p class="question-text">${question.prompt}</p>
      <div class="option-list">${optionsHtml}</div>
      <p class="option-divider">or write your own</p>
      <textarea
        id="response-input"
        class="response-input response-input--compact"
        name="response-input"
        placeholder="${question.placeholder}"
      >${escapeHtml(answer)}</textarea>
      <div class="nav-row">
        <button class="nav-button nav-secondary" type="button" id="previous-button" ${isFirst ? "disabled" : ""}>
          Previous
        </button>
        <button class="nav-button nav-primary" type="button" id="next-button">
          ${isLast ? "Review Answers" : "Next Question"}
        </button>
      </div>
      <div class="jump-grid">
        ${questions
          .map((_, index) => {
            const answered = state.answers[index].trim() ? "is-answered" : "";
            const current = index === state.currentQuestionIndex ? "is-current" : "";
            return `<button class="jump-button ${answered} ${current}" type="button" data-jump="${index}">${index + 1}</button>`;
          })
          .join("")}
      </div>
    </section>
  `;

  const responseInput = document.querySelector("#response-input");

  responseInput.addEventListener("input", (event) => {
    state.answers[state.currentQuestionIndex] = event.target.value;
    // Keep option highlighted only if text still exactly matches it
    document.querySelectorAll("[data-option]").forEach((btn, i) => {
      btn.classList.toggle("is-selected", question.options[i] === event.target.value);
    });
    updateNavigationDots();
  });

  document.querySelectorAll("[data-option]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = question.options[Number(btn.dataset.option)];
      state.answers[state.currentQuestionIndex] = text;
      responseInput.value = text;
      document.querySelectorAll("[data-option]").forEach((b) => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");
      updateNavigationDots();
    });
  });

  document.querySelector("#previous-button")?.addEventListener("click", () => {
    persistCurrentAnswer();
    state.currentQuestionIndex = Math.max(0, state.currentQuestionIndex - 1);
    renderQuestion();
    updateStatus();
  });

  document.querySelector("#next-button")?.addEventListener("click", () => {
    persistCurrentAnswer();
    state.currentQuestionIndex = Math.min(questions.length - 1, state.currentQuestionIndex + 1);
    renderQuestion();
    updateStatus();
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      persistCurrentAnswer();
      state.currentQuestionIndex = Number(button.dataset.jump);
      renderQuestion();
      updateStatus();
    });
  });
}

function updateNavigationDots() {
  document.querySelectorAll("[data-jump]").forEach((button, index) => {
    button.classList.toggle("is-answered", Boolean(state.answers[index].trim()));
  });
}

function persistCurrentAnswer() {
  const input = document.querySelector("#response-input");
  if (input) {
    state.answers[state.currentQuestionIndex] = input.value;
  }
}

function getWrittenResponses() {
  return questions.map((question, questionIndex) => ({
    question: question.prompt,
    answer: state.answers[questionIndex].trim()
  }));
}

function buildFallbackScoreMap(writtenResponses) {
  const base = Object.keys(personas).reduce((accumulator, key) => {
    accumulator[key] = 0;
    return accumulator;
  }, {});

  writtenResponses.forEach((response) => {
    const normalized = response.answer.toLowerCase();
    Object.entries(fallbackSignals).forEach(([type, keywords]) => {
      keywords.forEach((keyword) => {
        if (normalized.includes(keyword)) {
          base[type] += 1;
        }
      });
    });
  });

  if (Object.values(base).every((score) => score === 0)) {
    base.Philosopher = 1;
    base.Goblin = 1;
  }

  return base;
}

function rankScores(scoreMap) {
  return Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
}

async function classifyWithOpenRouter(writtenResponses) {
  const response = await fetch("/api/classify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ writtenResponses })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  return normalizeAiResult(await response.json());
}

function normalizeAiResult(parsed) {
  const safeTypeKey = personas[parsed.typeKey] ? parsed.typeKey : "Philosopher";
  const fallback = personas[safeTypeKey];

  const validDimensions =
    Array.isArray(parsed.dimensions) &&
    parsed.dimensions.length === 4 &&
    parsed.dimensions.every(
      (d) => d.label && typeof d.descriptor === "string" && typeof d.score === "number"
    );

  return {
    typeKey: safeTypeKey,
    typeTitle: parsed.typeTitle || fallback.title,
    summary: parsed.summary || `You radiate ${fallback.vibe}.`,
    matchStyle: parsed.matchStyle || `Your energy is pure ${fallback.vibe}.`,
    traits: Array.isArray(parsed.traits) && parsed.traits.length ? parsed.traits.slice(0, 4) : fallback.vibe.split(", "),
    bestMatches: Array.isArray(parsed.bestMatches) && parsed.bestMatches.length ? parsed.bestMatches.slice(0, 4) : fallback.companions,
    analysisNotes: parsed.analysisNotes || `The AI mapped your answers to ${fallback.title} based on your tone, humor, and decision-making style.`,
    signatureMotto: parsed.signatureMotto || "Commit to the bit and let history sort it out.",
    dimensions: validDimensions ? parsed.dimensions : fallbackDimensions[safeTypeKey]
  };
}

function buildFallbackResult(writtenResponses) {
  const scoreMap = buildFallbackScoreMap(writtenResponses);
  const ranking = rankScores(scoreMap);
  const [topType, topScore] = ranking[0];
  const [secondType, secondScore] = ranking[1];
  const persona = personas[topType];
  const secondPersona = personas[secondType];
  const scoreGap = topScore - secondScore;

  let summary = `You are ${persona.title}: ${persona.vibe}.`;
  if (scoreGap <= 1) {
    summary += ` There is also a strong trace of ${secondPersona.title}, which means your nonsense arrives with extra range.`;
  } else if (scoreGap <= 3) {
    summary += ` You still carry a visible hint of ${secondPersona.title} in the way you answer chaos.`;
  } else {
    summary += " Your answers showed remarkable commitment to a single flavor of weirdness.";
  }

  return {
    typeKey: topType,
    typeTitle: persona.title,
    summary,
    matchStyle: `In any room, you bring ${persona.vibe} and somehow make it sound like a leadership style.`,
    traits: persona.vibe.split(", ").map((trait) => trait.trim()),
    bestMatches: persona.companions,
    analysisNotes: buildAnalysisNotes(scoreMap),
    signatureMotto: buildFallbackMotto(topType),
    dimensions: fallbackDimensions[topType]
  };
}

function buildAnalysisNotes(scoreMap) {
  return Object.entries(scoreMap)
    .sort((a, b) => b[1] - a[1])
    .map(([key, score]) => `${personas[key].title}: ${score}`)
    .join("\n");
}

function buildFallbackMotto(typeKey) {
  const mottos = {
    Goblin: "If the plan is stupid but entertaining, we may be onto something.",
    Wizard: "Give me six tabs and a mild crisis and I will become impossible to stop.",
    Prophet: "Everything means something, especially the dumb stuff.",
    Mayor: "If nobody knows what is happening, I am technically in charge.",
    Philosopher: "I can absolutely turn this inconvenience into a thesis statement.",
    Counselor: "Someone has to hold the flashlight while the rest of you make terrible choices."
  };

  return mottos[typeKey];
}

function renderResult(result, analysisNotes) {
  resultCard.classList.remove("hidden");
  resultType.textContent = result.typeTitle;
  resultMatch.textContent = result.matchStyle;
  resultSummary.textContent = `${result.summary} Signature motto: "${result.signatureMotto}"`;

  const dimensionsEl = document.querySelector("#result-dimensions");
  dimensionsEl.innerHTML = result.dimensions
    .map(
      (d) => `
      <div class="dimension-row">
        <div class="dimension-meta">
          <span class="dimension-label">${d.label}</span>
          <span class="dimension-right">
            <span class="dimension-descriptor">${d.descriptor}</span>
            <span class="dimension-score">${d.score}%</span>
          </span>
        </div>
        <div class="dimension-track">
          <div class="dimension-fill" data-width="${d.score}%"></div>
        </div>
      </div>`
    )
    .join("");

  // Animate bars in after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      dimensionsEl.querySelectorAll(".dimension-fill").forEach((bar) => {
        bar.style.width = bar.dataset.width;
      });
    });
  });

  resultTraits.innerHTML = result.traits.map((trait) => `<li>${trait}</li>`).join("");
  resultMatches.innerHTML = result.bestMatches.map((match) => `<li>${match}</li>`).join("");
  scoreBreakdown.textContent = analysisNotes;
}

function updateStatus() {
  const answeredCount = state.answers.filter((answer) => answer.trim()).length;
  setStatus(`Question ${state.currentQuestionIndex + 1} of ${questions.length}. ${answeredCount} of ${questions.length} answered so far.`);
}

function setStatus(message) {
  statusCard.textContent = message;
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
