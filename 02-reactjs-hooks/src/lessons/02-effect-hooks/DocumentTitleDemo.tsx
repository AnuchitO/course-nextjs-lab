import { useEffect, useState } from 'react'

// Step 2: a classic useEffect use case — synchronizing a React value
// with something outside React (here, document.title).
export function DocumentTitleDemo() {
  const [name, setName] = useState('World')

  useEffect(() => {
    document.title = `Hello, ${name}!`
  }, [name])

  return (
    <div>
      <h3>Document Title Sync (useEffect)</h3>
      <label>
        Name:{' '}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p data-testid="title-preview">document.title = "Hello, {name}!"</p>
    </div>
  )
}
