import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebouncedValue } from './useDebouncedValue'

// renderHook lets you unit test a hook in isolation, without needing a
// component to mount it in. `rerender` simulates the parent passing a
// new prop/value on a subsequent render.
describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('a', 300))
    expect(result.current).toBe('a')
  })

  it('only updates after the delay has passed without further changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'ab' })
    act(() => vi.advanceTimersByTime(200))
    // Still "a" — 300ms haven't elapsed since the last change.
    expect(result.current).toBe('a')

    rerender({ value: 'abc' })
    act(() => vi.advanceTimersByTime(200))
    // The 200ms from before "abc" was typed doesn't count — each
    // change resets the timer, exactly like a real search-as-you-type box.
    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('abc')
  })
})
