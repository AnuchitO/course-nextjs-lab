import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { ContextHooksLesson } from './ContextHooksLesson'
import { ThemeProvider, useTheme } from './ThemeContext'

describe('ContextHooksLesson', () => {
  it('starts in light theme and toggles to dark for every consumer', async () => {
    const user = userEvent.setup()
    render(<ContextHooksLesson />)

    expect(screen.getByTestId('theme-value')).toHaveTextContent(
      'Current theme: light',
    )

    await user.click(screen.getByText('Switch to dark mode'))

    expect(screen.getByTestId('theme-value')).toHaveTextContent(
      'Current theme: dark',
    )
    expect(screen.getByText('Switch to light mode')).toBeInTheDocument()
  })
})

describe('useTheme', () => {
  it('throws when used outside of a ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider',
    )
  })

  it('provides the current theme inside a ThemeProvider', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })
    expect(result.current.theme).toBe('light')
  })
})
