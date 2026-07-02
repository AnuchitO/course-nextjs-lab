import { useEffect, useLayoutEffect, useState } from 'react'

// Step 3: useLayoutEffect fires synchronously after DOM mutations but
// before the browser paints. useEffect fires asynchronously after paint.
// Toggling the box below logs the order these run in, so you can see
// useLayoutEffect always beats useEffect.
export function EffectOrderDemo() {
  const [visible, setVisible] = useState(false)
  const [log, setLog] = useState<string[]>([])

  useLayoutEffect(() => {
    if (!visible) return
    setLog((l) => [...l, 'useLayoutEffect ran'])
  }, [visible])

  useEffect(() => {
    if (!visible) return
    setLog((l) => [...l, 'useEffect ran'])
  }, [visible])

  return (
    <div>
      <h3>Effect Order (useLayoutEffect vs useEffect)</h3>
      <button
        onClick={() => {
          setLog([])
          setVisible((v) => !v)
        }}
      >
        Toggle box
      </button>
      <ol data-testid="effect-log">
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ol>
    </div>
  )
}
