import { useRef, useState } from 'react'

// Step 2: useRef can also hold plain data — here, a render counter and
// the previous value of `text`. Mutating `.current` does NOT trigger a
// re-render, unlike useState, which is exactly why it's safe to read
// and write mid-render for bookkeeping like this.
export function RenderTrackerDemo() {
  const [text, setText] = useState('')
  const renderCount = useRef(0)
  const previousText = useRef('')

  renderCount.current += 1

  const prev = previousText.current
  previousText.current = text

  return (
    <div>
      <h3>Render Tracker (useRef as mutable value)</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p data-testid="render-count">Renders: {renderCount.current}</p>
      <p data-testid="previous-value">Previous value: "{prev}"</p>
    </div>
  )
}
