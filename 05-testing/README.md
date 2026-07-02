# Testing React with Vitest + RTL, in a Next.js project

A Next.js (App Router) project set up with [Vitest](https://vitest.dev)
and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
per the [official Next.js Vitest guide](https://nextjs.org/docs/app/building-your-application/testing/vitest),
covering as many realistic RTL testing use cases as reasonably fit in
one project — one component + one test file per use case.

## Run it

```bash
bun install
bun dev        # open http://localhost:3000 and click through the examples
bun test       # run the full test suite once
bun test:watch # re-run tests on change
```

## Use cases

Every component lives under `components/examples/<NN-topic>/`, next to
its test file:

1. **Basic rendering** — accessible query priority (`getByRole` over
   `getByTestId`), `rerender`.
2. **Conditional rendering** — props-driven branches, covered with
   `it.each`.
3. **User interactions** — `userEvent` for click and full keyboard
   navigation (`tab`, `{Enter}`), not just `fireEvent`.
4. **Forms** — controlled inputs found via `getByLabelText`,
   validation errors, a mocked `onSubmit`.
5. **Async data fetching** — loading/success/error states, stubbing
   `global.fetch`, `findBy*` queries.
6. **Custom hooks** — `renderHook` + `rerender` + fake timers for a
   debounce hook.
7. **Context + custom render** — a `CartProvider`/`useCart` pair, and
   `test/test-utils.tsx`, a project-wide custom `render` that already
   wraps every test in the right providers.
8. **next/navigation mocking** — `useRouter`/`usePathname`/
   `useSearchParams` via `vi.mock('next/navigation')`.
9. **next/link + next/image** — showing these need *no* mocking,
   unlike `next/navigation`.
10. **MSW API mocking** — network-level interception with
    `msw`/`msw/node` (`test/msw/`), for when several components share
    the same endpoints.
11. **Accessible modal** — `role="dialog"` + `aria-labelledby`, closing
    on Escape and backdrop click, not on content click.
12. **Error boundaries** — a class-based `ErrorBoundary`, a `Bomb`
    component that throws on demand, spying on `console.error`.
13. **Server Components** — what Vitest/RTL *can't* test (see
    `components/examples/13-server-components/README.md`): synchronous
    Server Components render fine, but `async function Page()` needs
    E2E tests instead.

## Notes

- `vitest.config.mts` follows the Next.js docs exactly:
  `vite-tsconfig-paths` + `@vitejs/plugin-react`, `environment: 'jsdom'`.
- `app/api/posts` and `app/api/users/[id]` are real (in-memory) route
  handlers, so the homepage actually works end-to-end in the browser —
  the unit tests still mock the network layer rather than hitting them.
- Prefer `test/test-utils.tsx`'s `render` over `@testing-library/react`'s
  directly once a component needs a provider — see use case 7.
