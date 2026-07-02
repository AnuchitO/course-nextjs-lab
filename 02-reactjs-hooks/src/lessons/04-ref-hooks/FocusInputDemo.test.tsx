import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FocusInputDemo } from './FocusInputDemo'

describe('FocusInputDemo', () => {
  it('focuses the input when the button is clicked', async () => {
    const user = userEvent.setup()
    render(<FocusInputDemo />)

    const input = screen.getByPlaceholderText('Click the button to focus me')
    expect(input).not.toHaveFocus()

    await user.click(screen.getByText('Focus input'))
    expect(input).toHaveFocus()
  })
})
