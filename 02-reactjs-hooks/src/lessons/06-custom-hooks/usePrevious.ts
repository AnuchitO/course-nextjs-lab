import { useEffect, useRef } from 'react'

// Combines useRef + useEffect: after each render where `value` changed,
// stash it away so the *next* render can read what it used to be.
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
