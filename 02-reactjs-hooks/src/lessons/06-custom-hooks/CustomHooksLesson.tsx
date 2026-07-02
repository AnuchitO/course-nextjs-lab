import { CustomHooksDemo } from './CustomHooksDemo'
import { DraftCommentDemo } from './DraftCommentDemo'

export function CustomHooksLesson() {
  return (
    <section>
      <h2>6. Your Own Hooks</h2>
      <p>
        A custom hook is a plain function whose name starts with{' '}
        <code>use</code> and which calls other hooks inside it. This demo
        composes four of them — <code>useCounter</code>,{' '}
        <code>usePrevious</code>, <code>useToggle</code>, and{' '}
        <code>useLocalStorage</code> — each defined once and reused here.
      </p>
      <CustomHooksDemo />
      <hr />
      <DraftCommentDemo />
    </section>
  )
}
