import type { ReactNode } from 'react'
import { useTheme } from './ThemeContext'

// This component is nested several levels deep in the tree but reads
// the theme directly via useContext — no props were passed down to it.
function DeeplyNestedLabel() {
  const { theme } = useTheme()
  return <p data-testid="theme-value">Current theme: {theme}</p>
}

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="wrapper">{children}</div>
}

export function ThemedPanel() {
  const { theme } = useTheme()

  return (
    <div
      data-testid="themed-panel"
      style={{
        background: theme === 'dark' ? '#222' : '#f5f5f5',
        color: theme === 'dark' ? '#eee' : '#111',
        padding: '1rem',
      }}
    >
      <Wrapper>
        <Wrapper>
          <DeeplyNestedLabel />
        </Wrapper>
      </Wrapper>
    </div>
  )
}
