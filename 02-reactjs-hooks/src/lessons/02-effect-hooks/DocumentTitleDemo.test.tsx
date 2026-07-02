import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DocumentTitleDemo } from './DocumentTitleDemo'

describe('DocumentTitleDemo', () => {
  it('sets document.title on mount', () => {
    render(<DocumentTitleDemo />)
    expect(document.title).toBe('Hello, World!')
  })

  it('updates document.title when the name changes', async () => {
    const user = userEvent.setup()
    render(<DocumentTitleDemo />)

    const input = screen.getByLabelText('Name:')
    await user.clear(input)
    await user.type(input, 'Ada')

    expect(document.title).toBe('Hello, Ada!')
    expect(screen.getByTestId('title-preview')).toHaveTextContent(
      'document.title = "Hello, Ada!"',
    )
  })
})
