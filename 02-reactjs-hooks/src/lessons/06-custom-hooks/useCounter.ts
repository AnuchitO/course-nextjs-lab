import { useState } from 'react'

// A custom hook is just a function that starts with "use" and calls
// other hooks. It lets you extract and reuse stateful logic between
// components without repeating it or changing your component tree
// (unlike a wrapper component or a render-prop).
export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)

  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)
  const reset = () => setCount(initial)

  return { count, increment, decrement, reset }
}
