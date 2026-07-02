# Server Components and Vitest/RTL

Per the [Next.js Vitest guide](https://nextjs.org/docs/app/building-your-application/testing/vitest):

> Since `async` Server Components are new to the React ecosystem,
> Vitest currently does not support them. While you can still run unit
> tests for synchronous Server and Client Components, we recommend
> using E2E tests for `async` components.

In practice:

- **Synchronous Server Component** (a plain function, no `async`, no
  hooks, no `"use client"`) — like `PostCard.tsx` in this folder —
  renders and tests fine with `render()` + RTL queries, exactly like a
  Client Component.
- **`async function Page()` that `await`s a fetch/DB call directly in
  the component body** — the common App Router data-fetching pattern —
  cannot be rendered by `render()` in Vitest/jsdom. Don't try to work
  around this with a hacky `await Page()` call; write an end-to-end
  test instead (Playwright, driving a real running `next dev`/`next
  start` server) for anything that needs to prove the async component
  actually renders with real (or mocked-at-the-network-level) data.

A useful split in practice: keep data fetching in a thin `async`
Server Component at the top of a route, and pass the resolved data
down as props to synchronous child components. The children stay unit
testable with RTL; only the thin async wrapper needs E2E coverage.
