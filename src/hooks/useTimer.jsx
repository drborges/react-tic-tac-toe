import { useCallback, useEffect, useRef } from "react"
import { useCounter } from "./useCounter"

/*
 * It's a good practice to by default memoize any API exposed by the hook
 * so that clients can apply any optimizations to their code when needed, so
 * make sure you: wrap functions within `useCallback` and expensive computations
 * within `useMemo` as appropriated.
 */
export function useTimer() {
  const timer = useRef()
  const { count, increment, reset: resetCounter } = useCounter()
  const stop = useCallback(() => clearInterval(timer.current), [])
  const reset = useCallback(() => {
    resetCounter()
    timer.current = setInterval(increment, 1000)
  }, [resetCounter, increment])

  useEffect(() => {
    timer.current = setInterval(increment, 1000)
    return () => clearInterval(timer)
  }, [increment])

  return {
    count,
    reset,
    stop,
  }
}
