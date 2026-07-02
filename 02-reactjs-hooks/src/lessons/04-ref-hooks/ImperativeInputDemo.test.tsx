import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ImperativeInputDemo } from './ImperativeInputDemo'

describe('ImperativeInputDemo', () => {
  it('focuses the input via the exposed handle', async () => {
    const user = userEvent.setup()
    render(<ImperativeInputDemo />)

    const input = screen.getByPlaceholderText('Type something...')
    await user.click(screen.getByText('Focus'))
    expect(input).toHaveFocus()
  })

  it('clears the input via the exposed handle', async () => {
    const user = userEvent.setup()
    render(<ImperativeInputDemo />)

    const input = screen.getByPlaceholderText('Type something...')
    await user.type(input, 'hello')
    expect(input).toHaveValue('hello')

    await user.click(screen.getByText('Clear'))
    expect(input).toHaveValue('')
  })
})
