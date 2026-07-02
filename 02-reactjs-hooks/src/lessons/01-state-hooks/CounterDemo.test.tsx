import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CounterDemo } from './CounterDemo'

describe('CounterDemo', () => {
  it('starts at 0', () => {
    render(<CounterDemo />)
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 0')
  })

  it('increments and decrements', async () => {
    const user = userEvent.setup()
    render(<CounterDemo />)

    await user.click(screen.getByText('+1'))
    await user.click(screen.getByText('+1'))
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 2')

    await user.click(screen.getByText('-1'))
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 1')
  })

  it('resets to 0', async () => {
    const user = userEvent.setup()
    render(<CounterDemo />)

    await user.click(screen.getByText('+1'))
    await user.click(screen.getByText('Reset'))
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 0')
  })
})
