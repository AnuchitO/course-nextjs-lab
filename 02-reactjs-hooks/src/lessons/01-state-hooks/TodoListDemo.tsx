import { useReducer, useState } from 'react'

interface Todo {
  id: number
  text: string
  done: boolean
}

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'remove'; id: number }

// Step 2: useReducer is the right tool once state updates involve
// multiple sub-values or the "next state" depends on an action type.
// The reducer is a pure function: (state, action) => nextState.
function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [{ id: Date.now(), text: action.text, done: false }, ...state]
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      )
    case 'remove':
      return state.filter((todo) => todo.id !== action.id)
    default:
      return state
  }
}

export function TodoListDemo() {
  const [todos, dispatch] = useReducer(todosReducer, [])
  const [sTodos, setSTodos] = useState<Todo[]>([])

  const [text, setText] = useState('')

  const handleAdd = () => {
    if (!text.trim()) return
    dispatch({ type: 'add', text: text.trim() })
    setText('')
  }


  return (
    <div>
      <h3>Todo List (useReducer)</h3>
      <input
        aria-label="new-todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch({ type: 'toggle', id: todo.id })}
              />
              <span
                style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              >
                {todo.text}
              </span>
            </label>
            <button onClick={() => dispatch({ type: 'remove', id: todo.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
