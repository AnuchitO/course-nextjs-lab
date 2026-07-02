import { useEffect, useState } from 'react'

// Step 1: useEffect runs after render, and its cleanup function runs
// before the next effect and on unmount. The dependency array
// ([isRunning] here) controls when the effect re-runs.
export function TimerDemo() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    // Cleanup: without this, every re-run of the effect would stack up
    // another interval, leaking timers.
    return () => clearInterval(id)
  }, [isRunning])

  return (
    <div>
      <h3>Stopwatch (useEffect + cleanup)</h3>
      <p data-testid="seconds-value">Seconds: {seconds}</p>
      <button onClick={() => setIsRunning((r) => !r)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={() => {
          setIsRunning(false)
          setSeconds(0)
        }}
      >
        Reset
      </button>
    </div>
  )
}
