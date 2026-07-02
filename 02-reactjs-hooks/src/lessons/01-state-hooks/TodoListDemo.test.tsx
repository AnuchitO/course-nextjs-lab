import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TodoListDemo } from './TodoListDemo'

describe('TodoListDemo', () => {
  it('adds a todo', async () => {
    const user = userEvent.setup()
    render(<TodoListDemo />)

    await user.type(screen.getByLabelText('new-todo'), 'Buy milk')
    await user.click(screen.getByText('Add'))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByLabelText('new-todo')).toHaveValue('')
  })

  it('toggles a todo as done', async () => {
    const user = userEvent.setup()
    render(<TodoListDemo />)

    await user.type(screen.getByLabelText('new-todo'), 'Buy milk')
    await user.click(screen.getByText('Add'))

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(screen.getByText('Buy milk')).toHaveStyle({
      textDecoration: 'line-through',
    })
  })

  it('removes a todo', async () => {
    const user = userEvent.setup()
    render(<TodoListDemo />)

    await user.type(screen.getByLabelText('new-todo'), 'Buy milk')
    await user.click(screen.getByText('Add'))
    await user.click(screen.getByText('Remove'))

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })
})
