import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { EffectOrderDemo } from './EffectOrderDemo'

describe('EffectOrderDemo', () => {
  it('runs useLayoutEffect before useEffect', async () => {
    const user = userEvent.setup()
    render(<EffectOrderDemo />)

    await user.click(screen.getByText('Toggle box'))

    const entries = screen.getAllByRole('listitem').map((li) => li.textContent)
    expect(entries).toEqual(['useLayoutEffect ran', 'useEffect ran'])
  })
})
