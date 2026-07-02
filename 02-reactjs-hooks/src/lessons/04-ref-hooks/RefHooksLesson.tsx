import { FocusInputDemo } from './FocusInputDemo'
import { ImperativeInputDemo } from './ImperativeInputDemo'
import { RenderTrackerDemo } from './RenderTrackerDemo'

export function RefHooksLesson() {
  return (
    <section>
      <h2>4. Ref Hooks</h2>
      <p>
        <code>useRef</code> holds a mutable value that persists across
        renders without causing one when it changes.{' '}
        <code>useImperativeHandle</code> controls exactly what a parent can
        do through a ref to a component.
      </p>
      <FocusInputDemo />
      <hr />
      <RenderTrackerDemo />
      <hr />
      <ImperativeInputDemo />
    </section>
  )
}
