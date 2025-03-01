import OpenAI from "openai";
import { OpenAIResponse } from "@/types";

// Get API key based on environment (server or client)
const getApiKey = () => {
  // For server-side
  if (typeof window === "undefined") {
    return process.env.OPENAI_API_KEY;
  }

  // For client-side
  return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
};

// Check if API key exists
const apiKey = getApiKey();
if (!apiKey) {
  console.error(
    "Warning: OpenAI API key is not defined in environment variables"
  );
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

/**
 * Check if the OpenAI API key is available
 */
export function isApiKeyAvailable(): boolean {
  return !!getApiKey();
}

/**
 * Get the OpenAI API key for client use
 */
export function getClientApiKey(): string | undefined {
  return getApiKey();
}

/**
 * Generate a Jeopardy question for a given category and difficulty level
 */
export async function generateQuestion(
  category: string,
  value: number
): Promise<OpenAIResponse> {
  try {
    const difficultyMap: Record<number, string> = {
      100: "very easy",
      200: "easy",
      300: "medium",
      400: "hard",
      500: "very hard",
    };

    const difficulty = difficultyMap[value] || "medium";

    const prompt = `Generate a Jeopardy-style question and answer about "${category}". 
    The difficulty level should be ${difficulty} (${value} point value in Jeopardy).
    Format the response as a JSON object with "question" and "answer" properties.
    Make sure the question follows Jeopardy style where the "question" is actually phrased as a statement or fact,
    and the contestant has to respond in the form of a question.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a Jeopardy question writer." },
        { role: "user", content: prompt },
      ],
    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("No content in response");
    }

    return JSON.parse(content) as OpenAIResponse;
  } catch (error) {
    console.error("Error generating question:", error);
    return {
      question: "Error generating question. Please try again.",
      answer: "Error",
    };
  }
}
