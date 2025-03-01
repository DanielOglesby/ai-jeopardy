import React, { useState } from 'react';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  onReveal: (questionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onReveal }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = () => {
    if (!question.revealed) {
      onReveal(question.id);
      setIsFlipped(true);
    } else if (isFlipped && !showAnswer) {
      setShowAnswer(true);
    } else if (isFlipped && showAnswer) {
      // Close the card
      setIsFlipped(false);
      setShowAnswer(false);
    }
  };

  if (!question.revealed) {
    return (
      <div
        className="jeopardy-card h-28 md:h-36 w-full text-3xl md:text-5xl"
        onClick={handleClick}
      >
        <div className="jeopardy-card-front flex items-center justify-center">
          ${question.value}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`jeopardy-card h-28 md:h-36 w-full ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
    >
      {isFlipped ? (
        <div className="jeopardy-card-back text-white p-2 text-xs md:text-sm">
          {showAnswer ? (
            <div className="flex flex-col h-full items-center">
              <div className="font-bold mb-1">Answer:</div>
              <div className="overflow-y-auto max-h-full py-1 text-center">{question.answer}</div>
              <div className="mt-auto text-xs opacity-70 pt-1">(Click to close)</div>
            </div>
          ) : (
            <div className="flex flex-col h-full items-center">
              <div className="overflow-y-auto max-h-full py-1 text-center">{question.question}</div>
              <div className="mt-auto text-xs opacity-70 pt-1">(Click to see answer)</div>
            </div>
          )}
        </div>
      ) : (
        <div className="jeopardy-card-front flex items-center justify-center text-3xl md:text-5xl">
          ${question.value}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;