import { useCounter } from "../hooks/useCounter"

export function Counter({ initialCount = 0 }) {
  const { count, decrement, increment, reset } = useCounter(initialCount)

  return (
    <div>
      {count}
      <button onClick={decrement}>-1</button>
      <button onClick={increment}>+1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
