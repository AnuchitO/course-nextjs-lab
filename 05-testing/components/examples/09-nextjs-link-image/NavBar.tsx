import Link from 'next/link'

export function NavBar() {
  return (
    <nav aria-label="Main">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  )
}
