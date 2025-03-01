import type { NextApiRequest, NextApiResponse } from 'next';
import { generateQuestion } from '@/lib/openai';
import { OpenAIResponse } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OpenAIResponse | { error: string }>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, value } = req.body;

    // Validate inputs
    if (!category || !value) {
      return res.status(400).json({ error: 'Category and value are required' });
    }

    // Generate the question
    const result = await generateQuestion(category, value);
    
    // Return the generated question
    return res.status(200).json(result);
  } catch (error) {
    console.error('API error generating question:', error);
    return res.status(500).json({ 
      error: 'Failed to generate question',
      question: 'Error generating question',
      answer: 'Error'
    });
  }
}