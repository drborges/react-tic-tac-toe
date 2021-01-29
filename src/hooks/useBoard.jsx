import { useCallback, useState } from "react"

/*
 * It's a good practice to by default memoize any API exposed by the hook
 * so that clients can apply any optimizations to their code when needed, so
 * make sure you: wrap functions within `useCallback` and expensive computations
 * within `useMemo` as appropriated.
 */
export function useBoard(initialState) {
  const [board, setBoard] = useState(initialState)
  const reset = useCallback(() => setBoard(initialState), [initialState])
  const take = useCallback(
    (row, col, takenBy) => {
      board[row][col] = takenBy
      setBoard([...board])
    },
    [board],
  )

  return {
    board,
    take,
    reset,
  }
}
