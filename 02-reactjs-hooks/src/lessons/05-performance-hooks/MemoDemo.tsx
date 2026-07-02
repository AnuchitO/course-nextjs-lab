import { useMemo, useRef, useState } from 'react'

const WORDS = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig']

function expensiveFilter(query: string, computeCount: { current: number }) {
  computeCount.current += 1
  // Pretend this is expensive (e.g. filtering thousands of rows).
  return WORDS.filter((word) => word.includes(query.toLowerCase()))
}

// Step 1: useMemo recomputes `filtered` only when `query` changes.
// Clicking "Re-render (unrelated state)" changes `tick`, which re-renders
// the component, but does NOT re-run expensiveFilter — the compute
// count only goes up when the query itself changes.
export function MemoDemo() {
  const [query, setQuery] = useState('')
  const [tick, setTick] = useState(0)
  const computeCount = useRef(0)

  const filtered = useMemo(
    () => expensiveFilter(query, computeCount),
    [query],
  )

  return (
    <div>
      <h3>Expensive filter (useMemo)</h3>
      <input
        aria-label="filter-query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => setTick((t) => t + 1)}>
        Re-render (unrelated state): {tick}
      </button>
      <p data-testid="compute-count">Computed: {computeCount.current} times</p>
      <ul>
        {filtered.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </div>
  )
}
