import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DataFetchingDemo } from './DataFetchingDemo'

describe('DataFetchingDemo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows a loading state before the fetch resolves', () => {
    render(<DataFetchingDemo />)
    expect(screen.getByTestId('fetch-status')).toHaveTextContent('Loading...')
  })

  it('loads user 1 (300ms delay) after enough time passes', async () => {
    render(<DataFetchingDemo />)

    await act(() => vi.advanceTimersByTimeAsync(300))

    expect(screen.getByTestId('fetch-status')).toHaveTextContent(
      'Loaded: Ada Lovelace',
    )
  })

  it('ignores a stale, slower response when the user switches before it resolves', async () => {
    render(<DataFetchingDemo />)

    // Start loading user 1 (300ms), then switch to user 2 (100ms)
    // before user 1's request resolves.
    fireEvent.click(screen.getByText('Load user 2'))
    await act(() => vi.advanceTimersByTimeAsync(100))
    expect(screen.getByTestId('fetch-status')).toHaveTextContent(
      'Loaded: Grace Hopper',
    )

    // The original user-1 request now resolves at t=300, but its
    // effect was cleaned up when userId changed, so it must not
    // clobber the already-loaded user 2.
    await act(() => vi.advanceTimersByTimeAsync(200))
    expect(screen.getByTestId('fetch-status')).toHaveTextContent(
      'Loaded: Grace Hopper',
    )
  })
})
