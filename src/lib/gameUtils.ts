import { Category, Question, GameBoard } from '@/types';
import { generateQuestion } from './openai';
import { v4 as uuidv4 } from 'uuid';

export const VALUES = [100, 200, 300, 400, 500];

// Generate an empty game board with placeholder categories
export function createEmptyGameBoard(): GameBoard {
  const categories: Category[] = Array(5).fill(null).map((_, index) => {
    const categoryId = uuidv4();
    return {
      id: categoryId,
      name: `Category ${index + 1}`,
      questions: VALUES.map(value => ({
        id: uuidv4(),
        category: categoryId,
        value,
        question: '',
        answer: '',
        revealed: false
      }))
    };
  });

  return {
    categories
  };
}

// Update a category name in the game board
export function updateCategoryName(
  gameBoard: GameBoard,
  categoryId: string,
  name: string
): GameBoard {
  return {
    ...gameBoard,
    categories: gameBoard.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          name
        };
      }
      return category;
    })
  };
}

// Reveal a question on the game board
export function revealQuestion(
  gameBoard: GameBoard,
  questionId: string
): GameBoard {
  return {
    ...gameBoard,
    categories: gameBoard.categories.map(category => {
      return {
        ...category,
        questions: category.questions.map(question => {
          if (question.id === questionId) {
            return {
              ...question,
              revealed: true
            };
          }
          return question;
        })
      };
    })
  };
}

// Generate questions for all categories
export async function generateQuestionsForBoard(gameBoard: GameBoard): Promise<GameBoard> {
  const categories = [...gameBoard.categories];
  
  // Process each category
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    
    // Process each question in the category
    for (let j = 0; j < category.questions.length; j++) {
      const question = category.questions[j];
      
      // Only generate if question is empty
      if (!question.question || !question.answer) {
        try {
          const response = await generateQuestion(category.name, question.value);
          
          // Update the question with generated content
          category.questions[j] = {
            ...question,
            question: response.question,
            answer: response.answer,
          };
        } catch (error) {
          console.error(`Error generating question for ${category.name}, value ${question.value}:`, error);
        }
      }
    }
  }
  
  return {
    categories
  };
}