import { ClickOutsideDropdownDemo } from './ClickOutsideDropdownDemo'
import { DataFetchingDemo } from './DataFetchingDemo'
import { DocumentTitleDemo } from './DocumentTitleDemo'
import { EffectOrderDemo } from './EffectOrderDemo'
import { TimerDemo } from './TimerDemo'

export function EffectHooksLesson() {
  return (
    <section>
      <h2>2. Effect Hooks</h2>
      <p>
        <code>useEffect</code> synchronizes a component with a system outside
        React (timers, the DOM, subscriptions, servers).{' '}
        <code>useLayoutEffect</code> is the same idea but runs synchronously
        before paint, for effects that must not flicker.
      </p>
      <TimerDemo />
      <hr />
      <DocumentTitleDemo />
      <hr />
      <DataFetchingDemo />
      <hr />
      <ClickOutsideDropdownDemo />
      <hr />
      <EffectOrderDemo />
    </section>
  )
}
