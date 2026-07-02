import { useState } from 'react'

// Step 1: useState returns a [value, setter] pair.
// Passing an updater function to the setter (rather than a fresh value)
// is the safe way to update state that depends on the previous state,
// especially inside handlers that might fire multiple times per render.
export function CounterDemo() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount((c) => c - 1)
  const reset = () => setCount(5)

  return (
    <div>
      <h3>Counter (useState)</h3>
      <p data-testid="count-value">Count: {count}</p>
      <button onClick={decrement}>-1</button>
      <button onClick={increment}>+1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
