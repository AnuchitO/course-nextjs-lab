'use client'

import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
}

export function PostsList() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load posts')
        return res.json() as Promise<Post[]>
      })
      .then((data) => {
        if (!ignore) setPosts(data)
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (error) return <p role="alert">{error}</p>
  if (!posts) return <p>Loading posts...</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
