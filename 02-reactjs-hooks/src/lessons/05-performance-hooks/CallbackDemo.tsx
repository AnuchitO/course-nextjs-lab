import { memo, useCallback, useRef, useState } from 'react'

interface ChildProps {
  onIncrement: () => void
}

// React.memo skips re-rendering this component if its props are
// referentially equal to last time. That only works if the function
// props it receives are stable across renders. The render count is
// tracked and displayed inside the child itself, so what you see is
// exactly how many times Child's function body has run.
const Child = memo(function Child({ onIncrement }: ChildProps) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div>
      <button onClick={onIncrement}>Increment from child</button>
      <p data-testid="child-render-count">
        Child rendered {renderCount.current} times
      </p>
    </div>
  )
})

// Step 2: useCallback returns the same function reference across
// renders as long as its dependencies ([] here) don't change. Without
// it, `handleIncrement` would be a new function every render, which
// would defeat Child's memo() and re-render it every time the parent does.
export function CallbackDemo() {
  const [count, setCount] = useState(0)
  const [tick, setTick] = useState(0)

  const handleIncrement = useCallback(() => setCount((c) => c + 1), [])

  return (
    <div>
      <h3>Stable callbacks (useCallback + React.memo)</h3>
      <p data-testid="count-value">Count: {count}</p>
      <button onClick={() => setTick((t) => t + 1)}>
        Re-render parent (unrelated state): {tick}
      </button>
      <Child onIncrement={handleIncrement} />
    </div>
  )
}
