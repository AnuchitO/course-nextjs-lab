import { ThemedPanel } from './ThemedPanel'
import { ThemeProvider } from './ThemeContext'
import { ThemeToggleButton } from './ThemeToggleButton'

export function ContextHooksLesson() {
  return (
    <section>
      <h2>3. Context Hooks</h2>
      <p>
        <code>useContext</code> reads a value provided higher up the tree by a{' '}
        <code>Context.Provider</code>, without passing it down as a prop
        through every intermediate component.
      </p>
      <ThemeProvider>
        <ThemedPanel />
        <ThemeToggleButton />
      </ThemeProvider>
    </section>
  )
}
