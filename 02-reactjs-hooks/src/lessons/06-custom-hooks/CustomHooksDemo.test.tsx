import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { CustomHooksDemo } from './CustomHooksDemo'

describe('CustomHooksDemo', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('tracks count and its previous value together', async () => {
    const user = userEvent.setup()
    render(<CustomHooksDemo />)

    expect(screen.getByTestId('counter-value')).toHaveTextContent('Count: 0')
    expect(screen.getByTestId('previous-value')).toHaveTextContent(
      'Previous: none',
    )

    await user.click(screen.getByText('+1'))
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Count: 1')
    expect(screen.getByTestId('previous-value')).toHaveTextContent(
      'Previous: 0',
    )
  })

  it('toggles independently of the counter', async () => {
    const user = userEvent.setup()
    render(<CustomHooksDemo />)

    expect(screen.getByTestId('toggle-value')).toHaveTextContent(
      'Toggle is off',
    )
    await user.click(screen.getByText('Toggle'))
    expect(screen.getByTestId('toggle-value')).toHaveTextContent(
      'Toggle is on',
    )
  })

  it('persists the name field to localStorage', async () => {
    const user = userEvent.setup()
    render(<CustomHooksDemo />)

    await user.type(screen.getByLabelText(/Name/), 'Ada')
    expect(window.localStorage.getItem('custom-hooks-demo:name')).toBe(
      '"Ada"',
    )
  })
})
