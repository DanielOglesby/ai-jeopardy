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
    "Warning: OpenAI API key is not defined in environment variables",
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
  value: number,
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
    and the contestant has to respond in the form of a question.
    IMPORTANT: 
    1. The answer should NOT be the category name itself, as that defeats the purpose and challenge.
    2. Make sure the answer is specific information related to the category.
    3. Ensure this question is unique and distinctly different from other questions in the same category.
       For example, if creating multiple questions about "Physics", make sure each question covers a different 
       aspect, concept, or fact within physics rather than being variations of the same question.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a Jeopardy question writer. You will be asking questions of varying difficulties across different categories. You should aim to not ask multiple questions that have the same answer. You should aim to not ask questions where the answer is the name of the category itself.`,
        },
        { role: "user", content: prompt },
      ],
    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("No content in response");
    }

    // Extract JSON from potential markdown code blocks
    let jsonContent = content;
    if (content.includes("```json")) {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        jsonContent = jsonMatch[1].trim();
      }
    } else if (content.includes("```")) {
      const codeMatch = content.match(/```\s*([\s\S]*?)\s*```/);
      if (codeMatch && codeMatch[1]) {
        jsonContent = codeMatch[1].trim();
      }
    }

    try {
      return JSON.parse(jsonContent) as OpenAIResponse;
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      console.log("Raw content:", content);
      return {
        question: "Error processing AI response. Please try again.",
        answer: "Error",
      };
    }
  } catch (error) {
    console.error("Error generating question:", error);
    return {
      question: "Error generating question. Please try again.",
      answer: "Error",
    };
  }
}
