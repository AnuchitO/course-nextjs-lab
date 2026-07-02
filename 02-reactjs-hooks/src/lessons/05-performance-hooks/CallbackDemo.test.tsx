import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CallbackDemo } from './CallbackDemo'

describe('CallbackDemo', () => {
  it('does not re-render the memoized child when the parent re-renders', async () => {
    const user = userEvent.setup()
    render(<CallbackDemo />)

    expect(screen.getByTestId('child-render-count')).toHaveTextContent(
      'Child rendered 1 times',
    )

    await user.click(screen.getByText(/Re-render parent/))
    await user.click(screen.getByText(/Re-render parent/))
    expect(screen.getByTestId('child-render-count')).toHaveTextContent(
      'Child rendered 1 times',
    )
  })

  it('still lets the child trigger a state update in the parent', async () => {
    const user = userEvent.setup()
    render(<CallbackDemo />)

    await user.click(screen.getByText('Increment from child'))
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 1')
  })
})
