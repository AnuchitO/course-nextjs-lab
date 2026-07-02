'use client'

import { Suspense, useState, type ReactNode } from 'react'
import { Greeting } from './examples/01-basic-rendering/Greeting'
import { Badge } from './examples/02-conditional-rendering/Badge'
import { Counter } from './examples/03-user-interactions/Counter'
import { LoginForm, type LoginValues } from './examples/04-forms/LoginForm'
import { UserProfile } from './examples/05-async-data-fetching/UserProfile'
import { useDebouncedValue } from './examples/06-custom-hooks/useDebouncedValue'
import { CartProvider } from './examples/07-context-provider/CartContext'
import { CartSummary } from './examples/07-context-provider/CartSummary'
import { SearchFilters } from './examples/08-nextjs-navigation/SearchFilters'
import { Avatar } from './examples/09-nextjs-link-image/Avatar'
import { NavBar } from './examples/09-nextjs-link-image/NavBar'
import { PostsList } from './examples/10-msw-api-mocking/PostsList'
import { Modal } from './examples/11-accessible-modal/Modal'
import { Bomb } from './examples/12-error-boundary/Bomb'
import { ErrorBoundary } from './examples/12-error-boundary/ErrorBoundary'
import { PostCard } from './examples/13-server-components/PostCard'

function DebounceDemo() {
  const [text, setText] = useState('')
  const debounced = useDebouncedValue(text, 400)

  return (
    <div>
      <label>
        Search: <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <p>Debounced value (400ms after you stop typing): &quot;{debounced}&quot;</p>
    </div>
  )
}

function LoginFormDemo() {
  const [submitted, setSubmitted] = useState<LoginValues | null>(null)

  return (
    <div>
      <LoginForm onSubmit={setSubmitted} />
      {submitted && <p>Submitted as: {submitted.email}</p>}
    </div>
  )
}

function UserProfileDemo() {
  const [userId, setUserId] = useState('1')

  return (
    <div>
      <button onClick={() => setUserId('1')}>Load user 1</button>
      <button onClick={() => setUserId('2')}>Load user 2</button>
      <button onClick={() => setUserId('99')}>Load missing user</button>
      <UserProfile userId={userId} />
    </div>
  )
}

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example dialog">
        <p>Escape, or click outside, to close.</p>
      </Modal>
    </div>
  )
}

function ErrorBoundaryDemo() {
  const [shouldThrow, setShouldThrow] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  return (
    <div>
      <ErrorBoundary
        key={resetKey}
        fallback={
          <div>
            <p role="alert">Something went wrong.</p>
            <button
              onClick={() => {
                setShouldThrow(false)
                setResetKey((k) => k + 1)
              }}
            >
              Reset
            </button>
          </div>
        }
      >
        <Bomb shouldThrow={shouldThrow} />
      </ErrorBoundary>
      {!shouldThrow && (
        <button onClick={() => setShouldThrow(true)}>Trigger error</button>
      )}
    </div>
  )
}

const sections: { label: string; content: ReactNode }[] = [
  { label: '01 Basic rendering', content: <Greeting name="Ada" /> },
  {
    label: '02 Conditional rendering',
    content: (
      <div>
        <Badge status="online" /> <Badge status="away" />{' '}
        <Badge status="offline" />
      </div>
    ),
  },
  { label: '03 User interactions', content: <Counter /> },
  { label: '04 Forms', content: <LoginFormDemo /> },
  { label: '05 Async data fetching', content: <UserProfileDemo /> },
  { label: '06 Custom hooks', content: <DebounceDemo /> },
  {
    label: '07 Context provider',
    content: (
      <CartProvider>
        <CartSummary />
      </CartProvider>
    ),
  },
  {
    label: '08 next/navigation',
    content: (
      <Suspense fallback={<p>Loading filters...</p>}>
        <SearchFilters />
      </Suspense>
    ),
  },
  {
    label: '09 next/link + next/image',
    content: (
      <div>
        <NavBar />
        <Avatar name="Ada Lovelace" src="/next.svg" />
      </div>
    ),
  },
  { label: '10 MSW-mocked API', content: <PostsList /> },
  { label: '11 Accessible modal', content: <ModalDemo /> },
  { label: '12 Error boundary', content: <ErrorBoundaryDemo /> },
  {
    label: '13 Server component',
    content: <PostCard title="Hello" excerpt="A synchronous Server Component." />,
  },
]

export function ExamplesApp() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = sections[activeIndex]

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        Testing React with Vitest + RTL in Next.js
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Every section below has a matching test file next to its
        component under <code>components/examples/</code>.
      </p>
      <nav className="flex flex-wrap gap-2 mb-8" aria-label="examples">
        {sections.map((section, index) => (
          <button
            key={section.label}
            onClick={() => setActiveIndex(index)}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              index === activeIndex
                ? 'border-purple-400 bg-purple-50 dark:bg-purple-950'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>
      <main className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
        {active.content}
      </main>
    </div>
  )
}
