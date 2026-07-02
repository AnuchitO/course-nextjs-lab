import { CallbackDemo } from './CallbackDemo'
import { MemoDemo } from './MemoDemo'
import { TransitionDemo } from './TransitionDemo'

export function PerformanceHooksLesson() {
  return (
    <section>
      <h2>5. Performance Hooks</h2>
      <p>
        These hooks don't change behavior — they change <em>when</em> work
        happens. Reach for them only after noticing a real performance
        problem; used everywhere by default, they add complexity for no
        benefit.
      </p>
      <MemoDemo />
      <hr />
      <CallbackDemo />
      <hr />
      <TransitionDemo />
    </section>
  )
}
