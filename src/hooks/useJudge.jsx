import { useCallback, useMemo, useState } from "react"
import { countMovesLeft, findWinner } from "../helpers/board"

/*
 * It's a good practice to by default memoize any API exposed by the hook
 * so that clients can apply any optimizations to their code when needed, so
 * make sure you: wrap functions within `useCallback` and expensive computations
 * within `useMemo` as appropriated.
 */
export function useJudge(board) {
  const [currentPlayer, setCurrentPlayer] = useState("circle")
  const movesLeft = useMemo(() => countMovesLeft(board), [board])
  const noMovesLeft = movesLeft === 0
  const winner = useMemo(() => {
    if (movesLeft > 4) return null

    return findWinner(board)
  }, [movesLeft, board])

  const isGameOver = winner || noMovesLeft

  const nextPlayer = useCallback(() => {
    setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle")
  }, [currentPlayer])

  return {
    currentPlayer,
    nextPlayer,
    winner,
    isGameOver,
    movesLeft,
  }
}
