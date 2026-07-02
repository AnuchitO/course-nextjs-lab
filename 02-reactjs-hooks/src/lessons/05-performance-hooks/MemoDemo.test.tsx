import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MemoDemo } from './MemoDemo'

describe('MemoDemo', () => {
  it('computes once on mount and again only when the query changes', async () => {
    const user = userEvent.setup()
    render(<MemoDemo />)

    expect(screen.getByTestId('compute-count')).toHaveTextContent(
      'Computed: 1 times',
    )

    await user.click(screen.getByText(/Re-render \(unrelated state\)/))
    await user.click(screen.getByText(/Re-render \(unrelated state\)/))
    expect(screen.getByTestId('compute-count')).toHaveTextContent(
      'Computed: 1 times',
    )

    await user.type(screen.getByLabelText('filter-query'), 'an')
    expect(screen.getByTestId('compute-count')).toHaveTextContent(
      'Computed: 3 times',
    )
    expect(screen.getByText('banana')).toBeInTheDocument()
  })
})
