'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = ['all', 'books', 'electronics'] as const

export function SearchFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'all'

  function selectCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <div role="group" aria-label="Category filters">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          aria-pressed={activeCategory === category}
          onClick={() => selectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
