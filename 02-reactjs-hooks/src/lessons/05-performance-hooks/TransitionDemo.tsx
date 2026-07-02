import { useState, useTransition } from 'react'

const ALL_ITEMS = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`)

// Step 3: useTransition marks a state update as low priority. React
// keeps the UI responsive (and lets you show a pending indicator)
// instead of blocking on a potentially expensive re-render, like
// filtering a large list on every keystroke.
export function TransitionDemo() {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState(ALL_ITEMS)
  const [isPending, startTransition] = useTransition()

  const handleChange = (value: string) => {
    setQuery(value)
    startTransition(() => {
      setFiltered(
        ALL_ITEMS.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase()),
        ),
      )
    })
  }

  return (
    <div>
      <h3>Responsive filtering (useTransition)</h3>
      <input
        aria-label="transition-query"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
      {isPending && <p data-testid="pending-indicator">Updating list...</p>}
      <p data-testid="result-count">{filtered.length} results</p>
    </div>
  )
}
