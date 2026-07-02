# React Hooks, Step by Step

A Vite + React + TypeScript tutorial project covering the six hook
categories from the [React docs](https://react.dev/reference/react/hooks),
one lesson at a time. Every demo has a matching Vitest + React Testing
Library test file right next to it.

## Run it

```bash
bun install
bun dev        # open the app and click through the lessons
bun test       # run the full test suite once
bun test:watch # re-run tests on change
```

## Lessons

All lessons live under `src/lessons/`, wired up in `src/App.tsx`:

1. **State Hooks** (`01-state-hooks/`) — `useState` for a counter,
   `useReducer` for a small todo list.
2. **Effect Hooks** (`02-effect-hooks/`) — `useEffect` with cleanup
   (a stopwatch), synchronizing `document.title`, and `useLayoutEffect`
   vs `useEffect` ordering.
3. **Context Hooks** (`03-context-hooks/`) — `useContext` with a
   theme provider read by a deeply nested consumer, no prop drilling.
4. **Ref Hooks** (`04-ref-hooks/`) — `useRef` for DOM access and for
   mutable values that don't trigger re-renders, `useImperativeHandle`
   to expose a small imperative API from a child component.
5. **Performance Hooks** (`05-performance-hooks/`) — `useMemo`,
   `useCallback` + `React.memo`, and `useTransition`. These change
   *when* work happens, not what a component renders — reach for them
   after finding a real performance problem, not by default.
6. **Your Own Hooks** (`06-custom-hooks/`) — composing `useCounter`,
   `useToggle`, `usePrevious`, and `useLocalStorage`, each a small
   function that starts with `use` and calls other hooks internally.

Each lesson component is intentionally verbose with comments explaining
the *why* behind each hook call — read the source alongside the running
app.

## Notes

- No React Compiler / auto-memoization babel plugin is enabled here on
  purpose, so the `useMemo`/`useCallback`/`React.memo` demos in lesson 5
  actually demonstrate something.
- Tests use `@testing-library/react`'s `render`/`renderHook`, `fireEvent`
  for fake-timer-driven interactions (userEvent's internal delays don't
  mix with `vi.useFakeTimers()`), and `userEvent` everywhere else.
