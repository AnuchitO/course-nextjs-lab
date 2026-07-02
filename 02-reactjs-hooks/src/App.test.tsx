import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('shows the State Hooks lesson by default', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: '1. State Hooks' }),
    ).toBeInTheDocument()
  })

  it('switches lessons when a nav button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Context Hooks' }))

    expect(
      screen.getByRole('heading', { name: '3. Context Hooks' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '1. State Hooks' }),
    ).not.toBeInTheDocument()
  })
})
