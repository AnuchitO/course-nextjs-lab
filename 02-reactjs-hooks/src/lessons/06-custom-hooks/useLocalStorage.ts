import { useEffect, useState } from 'react'

// Combines useState + useEffect: state is initialized from
// localStorage (falling back to `initialValue`), and every change is
// persisted back to localStorage as a side effect.
//
// The browser only fires a "storage" event in *other* tabs/windows,
// never the one that made the write — so without this listener, two
// tabs open on the same page would silently drift out of sync (e.g. a
// "logged out" flag written by one tab never reaching the other until
// it's reloaded). Subscribing here is what makes this "reactive"
// rather than just "persisted".
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = window.localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : initialValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== key) return
      setValue(event.newValue ? (JSON.parse(event.newValue) as T) : initialValue)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key, initialValue])

  return [value, setValue] as const
}
