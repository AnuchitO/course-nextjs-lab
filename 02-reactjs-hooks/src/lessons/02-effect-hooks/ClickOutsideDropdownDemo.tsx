import { useEffect, useRef, useState } from 'react'

// Step 5: subscribing to an event on `window`/`document` is the other
// classic useEffect pattern — synchronizing with something outside
// React that can fire at any time. The listener is only attached while
// the dropdown is open, and cleanup removes it — without that, every
// open/close cycle would stack up another listener that never goes away.
export function ClickOutsideDropdownDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  return (
    <div>
      <h3>Click-outside dropdown (useEffect + window listener)</h3>
      <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
        <button onClick={() => setIsOpen((o) => !o)}>Menu</button>
        {isOpen && (
          <ul
            data-testid="dropdown-menu"
            style={{
              position: 'absolute',
              margin: 0,
              padding: '8px 16px',
              listStyle: 'none',
              border: '1px solid #ccc',
              background: 'white',
            }}
          >
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        )}
      </div>
    </div>
  )
}
