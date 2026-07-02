import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { DraftCommentDemo } from './DraftCommentDemo'

describe('DraftCommentDemo', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('starts empty with no saved draft', () => {
    render(<DraftCommentDemo />)
    expect(screen.getByTestId('draft-status')).toHaveTextContent(
      'Nothing typed yet',
    )
  })

  it('saves what you type as a draft', async () => {
    const user = userEvent.setup()
    render(<DraftCommentDemo />)

    await user.type(screen.getByLabelText('draft-comment'), 'Nice PR!')

    expect(screen.getByTestId('draft-status')).toHaveTextContent(
      'Draft saved',
    )
    expect(window.localStorage.getItem('draft-comment')).toBe('"Nice PR!"')
  })

  it('restores the draft on the next mount, like after a page refresh', () => {
    window.localStorage.setItem('draft-comment', JSON.stringify('half-typed'))

    render(<DraftCommentDemo />)

    expect(screen.getByLabelText('draft-comment')).toHaveValue('half-typed')
  })

  it('discards the draft', async () => {
    const user = userEvent.setup()
    render(<DraftCommentDemo />)

    await user.type(screen.getByLabelText('draft-comment'), 'oops')
    await user.click(screen.getByText('Discard draft'))

    expect(screen.getByLabelText('draft-comment')).toHaveValue('')
    expect(screen.getByTestId('draft-status')).toHaveTextContent(
      'Nothing typed yet',
    )
  })
})
