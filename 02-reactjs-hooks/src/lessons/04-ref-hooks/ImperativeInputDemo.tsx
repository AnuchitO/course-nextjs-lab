import { useImperativeHandle, useRef, useState } from 'react'

export interface ImperativeInputHandle {
  focus: () => void
  clear: () => void
}

// Step 3: useImperativeHandle customizes what a parent sees when it
// attaches a ref to this component — instead of the raw DOM node, the
// parent gets a small, intentional API (focus/clear). In React 19,
// function components accept `ref` as a normal prop; forwardRef is no
// longer required.
function ImperativeInput({
  ref,
}: {
  ref: React.Ref<ImperativeInputHandle>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => setValue(''),
  }))

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  )
}

export function ImperativeInputDemo() {
  const handleRef = useRef<ImperativeInputHandle>(null)

  return (
    <div>
      <h3>Imperative Handle (useImperativeHandle)</h3>
      <ImperativeInput ref={handleRef} />
      <button onClick={() => handleRef.current?.focus()}>Focus</button>
      <button onClick={() => handleRef.current?.clear()}>Clear</button>
    </div>
  )
}
