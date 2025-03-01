export interface Question {
  id: string;
  category: string;
  value: number;
  question: string;
  answer: string;
  revealed: boolean;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export interface GameBoard {
  categories: Category[];
}

export interface OpenAIResponse {
  question: string;
  answer: string;
}