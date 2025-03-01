import React from "react";
import { GameBoard as GameBoardType } from "@/types";
import QuestionCard from "./QuestionCard";
import CategoryHeader from "./CategoryHeader";

interface GameBoardProps {
  gameBoard: GameBoardType;
  isEditable: boolean;
  onCategoryChange: (categoryId: string, name: string) => void;
  onRevealQuestion: (questionId: string) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameBoard,
  isEditable,
  onCategoryChange,
  onRevealQuestion,
}) => {
  return (
    <div className="grid grid-cols-5 gap-1 xs:gap-2 w-full max-w-6xl mx-auto p-2 xs:p-4">
      {/* Category Headers */}
      {gameBoard.categories.map((category) => (
        <CategoryHeader
          key={category.id}
          category={category}
          isEditable={isEditable}
          onCategoryChange={onCategoryChange}
        />
      ))}

      {/* Questions Grid */}
      {[0, 1, 2, 3, 4].map((rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {gameBoard.categories.map((category) => (
            <QuestionCard
              key={category.questions[rowIndex].id}
              question={category.questions[rowIndex]}
              onReveal={onRevealQuestion}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GameBoard;
