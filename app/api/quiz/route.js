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

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      topic = "Security & Access",
      difficulty = "Beginner",
      subtopic = null,
      subtopicId = null
    } = body || {};

    const apiKey = process.env.GEMINI_API_KEY;
    const isApiKeyValid = Boolean(
      apiKey && 
      !apiKey.includes("paste-your") && 
      apiKey.trim().length > 10
    );

    // If Gemini key is not yet set or during offline development, serve from authentic question bank
    if (!isApiKeyValid) {
      console.log(`[API /api/quiz] Using offline question bank for: ${topic} (${subtopic || difficulty})`);
      const fallbackList =
        (subtopicId && APEX_SUBTOPIC_FALLBACKS[subtopicId]) ||
        FALLBACK_QUESTIONS[topic]?.[difficulty] ||
        FALLBACK_QUESTIONS["Apex & Architecture"]["Beginner"];

      return Response.json({
        source: "question-bank",
        topic,
        subtopic,
        difficulty,
        questions: fallbackList,
      });
    }

    // Call Google Gemini API
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are a Principal Salesforce Certified Technical Architect (CTA) and examination author.
Generate a high-yield, exactly 7-question multiple choice quiz for Salesforce professionals.
Topic: "${topic}".
${subtopic ? `Specific Sub-Topic / Section Focus: "${subtopic}". All 7 questions MUST directly and specifically test concepts, syntax, and scenarios from this exact sub-topic.` : ''}
Difficulty Level: "${difficulty}".

Rules:
1. Generate exactly 7 questions.
2. Provide exactly 4 options per question.
3. correct_index must be the 0-based index (0, 1, 2, or 3) of the correct answer.
4. explanation_correct: Exactly 2 punchy lines explaining why the correct choice is valid.
5. explanation_wrong: Exactly 2 punchy lines explaining why the other options fail or gotchas to avoid.
6. Make scenario questions practical and realistic (e.g. Universal Containers, real governor limits, exact UI/API behavior).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: QUIZ_SCHEMA,
        temperature: 0.7,
      },
    });

    const text = response.text?.trim() || "[]";
    const questions = JSON.parse(text);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Gemini returned invalid or empty questions array");
    }

    return Response.json({
      source: "gemini-ai",
      topic,
      subtopic,
      difficulty,
      questions,
    });
  } catch (err) {
    console.error("[API /api/quiz] Error generating quiz with Gemini:", err);
    // Graceful fallback to authentic question bank
    const topic = "Security & Access";
    const difficulty = "Beginner";
    const fallbackList = FALLBACK_QUESTIONS[topic][difficulty];

    return Response.json({
      source: "fallback-on-error",
      topic,
      difficulty,
      questions: fallbackList,
      error_message: err.message,
    });
  }
}
