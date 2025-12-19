import React, { useState } from "react";
const initialBoard = () => Array(9).fill(null);

const useTicTacToe = () => {
  const [board, setBoard] = useState(initialBoard());
  const [isXNext, setIsXNext] = useState(true);
  const WINNING_PATTERNS = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];
  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };
  const handleClick = (index) => {
    //cheack winner
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newboard = [...board];
    newboard[index] = isXNext ? "X" : "O";
    setBoard(newboard);
    setIsXNext(!isXNext);
  };
  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    console.log(winner);
    if (winner) return `Player ${winner}wins!`;
    if (!board.includes(null)) return `It's a draw`;
    return `Player ${isXNext ? "x" : "O"} turn`;
  };
  const resetGame = () => {
    setBoard(initialBoard());
    setIsXNext(true);
  };

  return { board, calculateWinner, resetGame, getStatusMessage, handleClick };
};

export default useTicTacToe;
