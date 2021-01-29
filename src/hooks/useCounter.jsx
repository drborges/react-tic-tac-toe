import { useCallback, useState } from "react"

/*
 * It's a good practice to by default memoize any API exposed by the hook
 * so that clients can apply any optimizations to their code when needed, so
 * make sure you: wrap functions within `useCallback` and expensive computations
 * within `useMemo` as appropriated.
 */
export function useCounter(initialCount = 0) {
  const [count, setCount] = useState(initialCount)
  const reset = useCallback(() => setCount(initialCount), [initialCount])
  const decrement = useCallback(() => setCount((count) => count - 1), [])
  const increment = useCallback(() => setCount((count) => count + 1), [])

  return {
    count,
    decrement,
    increment,
    reset,
  }
}
