import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('falls back to the initial value when nothing is stored', () => {
    const { result } = renderHook(() =>
      useLocalStorage('greeting', 'hello'),
    )
    expect(result.current[0]).toBe('hello')
  })

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('greeting', 'hello'),
    )

    act(() => result.current[1]('hi'))

    expect(result.current[0]).toBe('hi')
    expect(window.localStorage.getItem('greeting')).toBe('"hi"')
  })

  it('reads an existing value from localStorage on mount', () => {
    window.localStorage.setItem('greeting', JSON.stringify('bonjour'))

    const { result } = renderHook(() =>
      useLocalStorage('greeting', 'hello'),
    )
    expect(result.current[0]).toBe('bonjour')
  })

  it('picks up a change written by another tab via the storage event', () => {
    const { result } = renderHook(() =>
      useLocalStorage('greeting', 'hello'),
    )

    // Simulate another tab writing to the same key. The real browser
    // only fires this event in tabs that did NOT make the write, which
    // is exactly what a manually dispatched StorageEvent reproduces here.
    act(() => {
      window.localStorage.setItem('greeting', JSON.stringify('hola'))
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'greeting', newValue: '"hola"' }),
      )
    })

    expect(result.current[0]).toBe('hola')
  })

  it('ignores storage events for a different key', () => {
    const { result } = renderHook(() =>
      useLocalStorage('greeting', 'hello'),
    )

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'other-key', newValue: '"nope"' }),
      )
    })

    expect(result.current[0]).toBe('hello')
  })
})
