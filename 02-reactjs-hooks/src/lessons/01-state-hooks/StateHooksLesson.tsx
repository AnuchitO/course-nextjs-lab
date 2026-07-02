import { CounterDemo } from './CounterDemo'
import { TodoListDemo } from './TodoListDemo'

export function StateHooksLesson() {
  return (
    <section>
      <h2>1. State Hooks</h2>
      <p>
        <code>useState</code> holds a single value across renders.{' '}
        <code>useReducer</code> centralizes more complex state transitions
        into a pure reducer function.
      </p>
      <CounterDemo />
      <hr />
      <TodoListDemo />
    </section>
  )
}
