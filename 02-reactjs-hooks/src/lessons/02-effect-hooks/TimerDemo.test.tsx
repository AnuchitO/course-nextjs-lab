import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TimerDemo } from './TimerDemo'

describe('TimerDemo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not tick until started', () => {
    render(<TimerDemo />)
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByTestId('seconds-value')).toHaveTextContent(
      'Seconds: 0',
    )
  })

  it('ticks every second while running', () => {
    render(<TimerDemo />)

    fireEvent.click(screen.getByText('Start'))
    act(() => vi.advanceTimersByTime(3000))

    expect(screen.getByTestId('seconds-value')).toHaveTextContent(
      'Seconds: 3',
    )
  })

  it('stops ticking and resets', () => {
    render(<TimerDemo />)

    fireEvent.click(screen.getByText('Start'))
    act(() => vi.advanceTimersByTime(2000))
    fireEvent.click(screen.getByText('Stop'))
    act(() => vi.advanceTimersByTime(5000))

    expect(screen.getByTestId('seconds-value')).toHaveTextContent(
      'Seconds: 2',
    )

    fireEvent.click(screen.getByText('Reset'))
    expect(screen.getByTestId('seconds-value')).toHaveTextContent(
      'Seconds: 0',
    )
  })
})
