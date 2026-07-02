import { createContext, useContext, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

// Step 1: createContext gives every consumer access to a value without
// it being threaded through every component in between ("prop drilling").
const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Step 2: wrapping useContext in a custom hook lets us throw a clear
// error if someone forgets to render the provider, instead of a
// confusing "cannot read property of null" deep in a component.
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme xxx must be used within a ThemeProvider')
  return ctx
}
