import { GoogleGenAI, Type } from '@google/genai';
import { FALLBACK_QUESTIONS } from '@/lib/fallbackQuestions';
import { APEX_SUBTOPIC_FALLBACKS } from '@/lib/apexCurriculum';

// Define the JSON schema to strictly enforce Gemini output
const QUIZ_SCHEMA = {
  type: Type.ARRAY,
  description: "List of exactly 7 scenario-based Salesforce multiple-choice questions.",
  items: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.INTEGER,
        description: "Question sequence index (1 to 7)"
      },
      question: {
        type: Type.STRING,
        description: "Realistic, scenario-driven Salesforce problem or question"
      },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Exactly 4 distinct plausible answer choices"
      },
      correct_index: {
        type: Type.INTEGER,
        description: "Zero-based index of the correct answer (0, 1, 2, or 3)"
      },
      explanation_correct: {
        type: Type.STRING,
        description: "Punchy 2-line explanation why the selected answer is correct according to Salesforce architecture standards"
      },
      explanation_wrong: {
        type: Type.STRING,
        description: "Punchy 2-line explanation detailing why common alternate choices fail or represent anti-patterns"
      }
    },
    required: ["id", "question", "options", "correct_index", "explanation_correct", "explanation_wrong"]
  }
};

/**
 * Helper to ensure we always return exactly 7 questions, even in fallback mode.
 */
function getEnsuredFallbackQuestions(topic, difficulty, subtopicId) {
  const specificSubtopic = subtopicId && APEX_SUBTOPIC_FALLBACKS[subtopicId];
  const generalTopic =
    FALLBACK_QUESTIONS[topic]?.[difficulty] ||
    FALLBACK_QUESTIONS["Apex & Architecture"]?.[difficulty] ||
    FALLBACK_QUESTIONS["Apex & Architecture"]["Beginner"];

  if (specificSubtopic && specificSubtopic.length >= 7) {
    return specificSubtopic.slice(0, 7);
  }

  if (specificSubtopic && specificSubtopic.length > 0) {
    // Fill the rest up to 7 from the general topic pool
    const combined = [...specificSubtopic];
    generalTopic.forEach((q) => {
      if (combined.length < 7 && !combined.some((item) => item.question === q.question)) {
        combined.push({ ...q, id: combined.length + 1 });
      }
    });
    return combined.slice(0, 7);
  }

  return generalTopic.slice(0, 7);
}

export async function POST(request) {
  let requestedTopic = "Security & Access";
  let requestedDifficulty = "Beginner";
  let requestedSubtopic = null;
  let requestedSubtopicId = null;

  try {
    const body = await request.json();
    requestedTopic = body.topic || "Security & Access";
    requestedDifficulty = body.difficulty || "Beginner";
    requestedSubtopic = body.subtopic || null;
    requestedSubtopicId = body.subtopicId || null;

    const apiKey = process.env.GEMINI_API_KEY;
    const isApiKeyValid = Boolean(
      apiKey && 
      !apiKey.includes("paste-your") && 
      apiKey.trim().length > 10
    );

    // If Gemini key is not configured in Vercel environment variables
    if (!isApiKeyValid) {
      console.warn(`[API /api/quiz] GEMINI_API_KEY not detected or invalid. Using offline bank.`);
      const fallbackList = getEnsuredFallbackQuestions(
        requestedTopic,
        requestedDifficulty,
        requestedSubtopicId
      );

      return Response.json({
        source: "offline-bank-no-key",
        topic: requestedTopic,
        subtopic: requestedSubtopic,
        difficulty: requestedDifficulty,
        questions: fallbackList,
        notice: "Gemini API key is not configured in environment variables. To get unlimited dynamic AI questions, add GEMINI_API_KEY in Vercel settings.",
      });
    }

    // Call Google Gemini API
    const ai = new GoogleGenAI({ apiKey });

    // Generate unique seed so questions are fresh and never identical on repeated attempts
    const uniqueSessionSeed = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

    const systemPrompt = `You are a Principal Salesforce Certified Technical Architect (CTA) and examination author.
Generate a brand new, highly realistic, exactly 7-question multiple choice quiz for Salesforce professionals.
Topic: "${requestedTopic}".
${requestedSubtopic ? `Specific Sub-Topic Focus: "${requestedSubtopic}". All 7 questions MUST directly and specifically test syntax, methods, and practical scenarios from this exact sub-topic.` : ''}
Difficulty Level: "${requestedDifficulty}".
Random Seed / Session: "${uniqueSessionSeed}".

CRITICAL INSTRUCTIONS FOR VARIETY:
- Generate completely fresh, unique scenario questions. Do not repeat standard trivial questions.
- For Beginner: test core syntax, definitions, methods, and return types.
- For Intermediate: test multi-step business logic, relations, and common governor limit warnings.
- For Tricky Scenario: test exam gotchas, order of execution nuances, silent failures, and exception behaviors.
- Each of the 7 questions MUST be distinct from each other.
- Exactly 4 options per question.
- correct_index must be the 0-based index (0, 1, 2, or 3) of the correct answer.
- explanation_correct: Exactly 2 punchy lines explaining why the correct choice is valid.
- explanation_wrong: Exactly 2 punchy lines explaining why the other options fail or common pitfalls to avoid.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: QUIZ_SCHEMA,
        temperature: 0.95, // High temperature guarantees varied questions on each attempt
      },
    });

    const text = response.text?.trim() || "[]";
    const questions = JSON.parse(text);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Gemini returned an empty questions array");
    }

    // Ensure all 7 have proper sequential IDs 1 to 7
    const normalizedQuestions = questions.slice(0, 7).map((q, idx) => ({
      ...q,
      id: idx + 1,
    }));

    return Response.json({
      source: "gemini-ai",
      topic: requestedTopic,
      subtopic: requestedSubtopic,
      difficulty: requestedDifficulty,
      questions: normalizedQuestions,
    });
  } catch (err) {
    console.error("[API /api/quiz] Error generating quiz with Gemini:", err);
    // Graceful fallback matching the actual requested topic & difficulty
    const fallbackList = getEnsuredFallbackQuestions(
      requestedTopic,
      requestedDifficulty,
      requestedSubtopicId
    );

    return Response.json({
      source: "fallback-on-error",
      topic: requestedTopic,
      subtopic: requestedSubtopic,
      difficulty: requestedDifficulty,
      questions: fallbackList,
      error_message: err.message,
    });
  }
}
