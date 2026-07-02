// No "use client" directive and no hooks — this is a Server Component
// by default in the App Router. It's also just a plain synchronous
// function, so RTL can render it exactly like a Client Component. See
// README.md in this folder for what RTL can and can't test here.
export function PostCard({
  title,
  excerpt,
}: {
  title: string
  excerpt: string
}) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </article>
  )
}
