import { useState } from 'react'
import './App.css'
import { StateHooksLesson } from './lessons/01-state-hooks/StateHooksLesson'
import { EffectHooksLesson } from './lessons/02-effect-hooks/EffectHooksLesson'
import { ContextHooksLesson } from './lessons/03-context-hooks/ContextHooksLesson'
import { RefHooksLesson } from './lessons/04-ref-hooks/RefHooksLesson'
import { PerformanceHooksLesson } from './lessons/05-performance-hooks/PerformanceHooksLesson'
import { CustomHooksLesson } from './lessons/06-custom-hooks/CustomHooksLesson'

const lessons = [
  { label: 'State Hooks', Component: StateHooksLesson },
  { label: 'Effect Hooks', Component: EffectHooksLesson },
  { label: 'Context Hooks', Component: ContextHooksLesson },
  { label: 'Ref Hooks', Component: RefHooksLesson },
  { label: 'Performance Hooks', Component: PerformanceHooksLesson },
  { label: 'Your Own Hooks', Component: CustomHooksLesson },
] as const

function App() {
  // The nav itself is the simplest possible useState example: which
  // lesson index is currently selected.
  const [activeIndex, setActiveIndex] = useState(0)
  const ActiveLesson = lessons[activeIndex].Component

  return (
    <div id="app-root">
      <header>
        <h1>React Hooks, Step by Step</h1>
        <p>Click through each lesson below. Every demo has matching tests.</p>
      </header>
      <nav aria-label="lessons">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.label}
            className={index === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            {lesson.label}
          </button>
        ))}
      </nav>
      <main>
        <ActiveLesson />
      </main>
    </div>
  )
}

export default App
