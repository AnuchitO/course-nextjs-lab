import { useRef } from 'react'

// Step 1: useRef gives you a mutable box (`.current`) that survives
// re-renders without causing one when it changes. Attaching it to a
// `ref` prop lets you reach the underlying DOM node imperatively.
export function FocusInputDemo() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <h3>Focus an input (useRef + DOM)</h3>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <button onClick={() => inputRef.current?.focus()}>Focus input</button>
    </div>
  )
}
