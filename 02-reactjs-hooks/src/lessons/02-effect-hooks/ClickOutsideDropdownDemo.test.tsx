import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ClickOutsideDropdownDemo } from './ClickOutsideDropdownDemo'

describe('ClickOutsideDropdownDemo', () => {
  it('opens the menu on click and is closed by default', async () => {
    const user = userEvent.setup()
    render(<ClickOutsideDropdownDemo />)

    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument()

    await user.click(screen.getByText('Menu'))
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
  })

  it('closes when clicking outside the menu', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <p>Outside</p>
        <ClickOutsideDropdownDemo />
      </div>,
    )

    await user.click(screen.getByText('Menu'))
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()

    await user.click(screen.getByText('Outside'))
    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument()
  })

  it('does not close when clicking an item inside the menu', async () => {
    const user = userEvent.setup()
    render(<ClickOutsideDropdownDemo />)

    await user.click(screen.getByText('Menu'))
    await user.click(screen.getByText('Settings'))

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
  })
})
