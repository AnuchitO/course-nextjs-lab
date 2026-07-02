import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TransitionDemo } from './TransitionDemo'

describe('TransitionDemo', () => {
  it('shows all items initially', () => {
    render(<TransitionDemo />)
    expect(screen.getByTestId('result-count')).toHaveTextContent(
      '200 results',
    )
  })

  it('filters the list as a transition', async () => {
    const user = userEvent.setup()
    render(<TransitionDemo />)

    await user.type(screen.getByLabelText('transition-query'), 'Item 1')

    await waitFor(() => {
      expect(screen.getByTestId('result-count')).toHaveTextContent(
        '111 results',
      )
    })
  })
})
