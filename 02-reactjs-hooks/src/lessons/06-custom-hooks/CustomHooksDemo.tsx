import { useCounter } from './useCounter'
import { useLocalStorage } from './useLocalStorage'
import { usePrevious } from './usePrevious'
import { useToggle } from './useToggle'

export function CustomHooksDemo() {
  const { count, increment, decrement, reset } = useCounter(0)
  const previousCount = usePrevious(count)
  const [isOn, toggleIsOn] = useToggle(false)
  const [name, setName] = useLocalStorage('custom-hooks-demo:name', '')

  return (
    <div>
      <h3>Composing custom hooks</h3>

      <div>
        <p data-testid="counter-value">Count: {count}</p>
        <p data-testid="previous-value">
          Previous: {previousCount === undefined ? 'none' : previousCount}
        </p>
        <button onClick={decrement}>-1</button>
        <button onClick={increment}>+1</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div>
        <p data-testid="toggle-value">Toggle is {isOn ? 'on' : 'off'}</p>
        <button onClick={toggleIsOn}>Toggle</button>
      </div>

      <div>
        <label>
          Name (persisted to localStorage):{' '}
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
    </div>
  )
}
