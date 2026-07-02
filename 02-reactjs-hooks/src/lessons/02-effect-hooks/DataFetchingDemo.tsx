import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
}

const NAMES: Record<number, string> = {
  1: 'Ada Lovelace',
  2: 'Grace Hopper',
  3: 'Margaret Hamilton',
}

// Deliberately uneven delays per id, so switching quickly between
// users can make an *earlier* request resolve *after* a later one —
// exactly the race condition the effect below guards against.
const DELAYS: Record<number, number> = { 1: 300, 2: 100, 3: 200 }

// Stands in for a real `fetch(...)` call.
function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: NAMES[id] }), DELAYS[id])
  })
}

// Step 4: fetching data is the most common real-world reason to reach
// for useEffect. The `ignore` flag set in the cleanup guards against a
// race condition — if `userId` changes again before this request
// resolves, the stale response is dropped instead of overwriting
// whatever the newer request already loaded.
export function DataFetchingDemo() {
  const [userId, setUserId] = useState(1)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let ignore = false
    setIsLoading(true)

    fetchUser(userId).then((data) => {
      if (!ignore) {
        setUser(data)
        setIsLoading(false)
      }
    })

    return () => {
      ignore = true
    }
  }, [userId])

  return (
    <div>
      <h3>Fetching data (useEffect + race-condition guard)</h3>
      <div>
        {Object.keys(NAMES).map((id) => (
          <button key={id} onClick={() => setUserId(Number(id))}>
            Load user {id}
          </button>
        ))}
      </div>
      <p data-testid="fetch-status">
        {isLoading ? 'Loading...' : `Loaded: ${user?.name}`}
      </p>
    </div>
  )
}
