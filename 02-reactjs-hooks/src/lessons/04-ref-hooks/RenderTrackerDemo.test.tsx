import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { RenderTrackerDemo } from './RenderTrackerDemo'

describe('RenderTrackerDemo', () => {
  it('tracks render count and previous value without re-rendering on ref mutation', async () => {
    const user = userEvent.setup()
    render(<RenderTrackerDemo />)

    expect(screen.getByTestId('render-count')).toHaveTextContent('Renders: 1')
    expect(screen.getByTestId('previous-value')).toHaveTextContent(
      'Previous value: ""',
    )

    await user.type(screen.getByRole('textbox'), 'hi')

    expect(screen.getByTestId('render-count')).toHaveTextContent('Renders: 3')
    expect(screen.getByTestId('previous-value')).toHaveTextContent(
      'Previous value: "h"',
    )
  })
})
