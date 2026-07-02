'use client'

import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
}

type FetchState =
  | { status: 'idle' }
  | { status: 'success'; userId: string; user: User }
  | { status: 'error'; userId: string; message: string }

export function UserProfile({ userId }: { userId: string }) {
  const [state, setState] = useState<FetchState>({ status: 'idle' })

  useEffect(() => {
    let ignore = false

    fetch(`/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found')
        return res.json() as Promise<User>
      })
      .then((user) => {
        if (!ignore) setState({ status: 'success', userId, user })
      })
      .catch((err: Error) => {
        if (!ignore) setState({ status: 'error', userId, message: err.message })
      })

    return () => {
      ignore = true
    }
  }, [userId])

  // Deriving "is this loading" from whether the state we have was
  // fetched for the *current* userId — rather than a separate
  // isLoading flag toggled with setState — is what lets this effect
  // avoid ever calling setState synchronously in its own body: state
  // is only ever set from inside the fetch's .then/.catch callbacks.
  const isLoadingCurrentUser =
    state.status === 'idle' || state.userId !== userId

  if (isLoadingCurrentUser) return <p>Loading user...</p>
  if (state.status === 'error') return <p role="alert">{state.message}</p>
  return <p>{state.user.name}</p>
}
