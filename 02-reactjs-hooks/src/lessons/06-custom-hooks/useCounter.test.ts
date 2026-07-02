import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('starts at the given initial value', () => {
    const { result } = renderHook(() => useCounter(5))
    expect(result.current.count).toBe(5)
  })

  it('increments, decrements, and resets', () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => result.current.increment())
    expect(result.current.count).toBe(6)

    act(() => result.current.decrement())
    act(() => result.current.decrement())
    expect(result.current.count).toBe(4)

    act(() => result.current.reset())
    expect(result.current.count).toBe(5)
  })
})
