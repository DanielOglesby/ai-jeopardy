import { useState, useEffect } from 'react';
import Head from 'next/head';
import GameBoard from '@/components/GameBoard';
import { createEmptyGameBoard, updateCategoryName, revealQuestion, generateQuestionsForBoard } from '@/lib/gameUtils';
import { GameBoard as GameBoardType } from '@/types';

export default function Home() {
  const [gameBoard, setGameBoard] = useState<GameBoardType | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the game board on mount
  useEffect(() => {
    setGameBoard(createEmptyGameBoard());
  }, []);

  const handleCategoryChange = (categoryId: string, name: string) => {
    if (gameBoard) {
      setGameBoard(updateCategoryName(gameBoard, categoryId, name));
    }
  };

  const handleRevealQuestion = (questionId: string) => {
    if (gameBoard) {
      setGameBoard(revealQuestion(gameBoard, questionId));
    }
  };

  const handleStartGame = async () => {
    if (!gameBoard) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Generate questions for all categories
      const updatedBoard = await generateQuestionsForBoard(gameBoard);
      setGameBoard(updatedBoard);
      
      // Switch to game mode
      setIsEditing(false);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGameBoard(createEmptyGameBoard());
    setIsEditing(true);
    setError(null);
  };

  if (!gameBoard) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>AI Jeopardy</title>
        <meta name="description" content="Create custom Jeopardy games with AI-generated questions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-jeopardy-board flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-center text-jeopardy-gold text-4xl md:text-6xl font-bold my-6">
            AI Jeopardy
          </h1>

          {error && (
            <div className="bg-red-500 text-white p-4 mb-4 rounded">
              {error}
            </div>
          )}

          <GameBoard
            gameBoard={gameBoard}
            isEditable={isEditing}
            onCategoryChange={handleCategoryChange}
            onRevealQuestion={handleRevealQuestion}
          />

          <div className="flex justify-center mt-8 mb-12 gap-4">
            {isEditing ? (
              <button
                onClick={handleStartGame}
                disabled={isLoading}
                className="bg-jeopardy-gold hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded text-xl disabled:opacity-50"
              >
                {isLoading ? 'Generating Questions...' : 'Start Game'}
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="bg-jeopardy-gold hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded text-xl"
              >
                Reset Game
              </button>
            )}
          </div>
          
          <div className="text-center text-white opacity-70 mb-8">
            {isEditing ? (
              <p>Enter your categories, then click Start Game to generate AI questions</p>
            ) : (
              <p>Click on the dollar amounts to reveal questions</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}