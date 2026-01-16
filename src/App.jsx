import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import Filter from './components/Filter'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })

  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (text, category, priority) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      category: category,
      priority: priority,
      isCompleted: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText, newCategory, newPriority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText, category: newCategory, priority: newPriority } : todo
    ))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true
    return todo.category === filter
  })

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">My To Do List</h1>
        
        <TodoForm addTodo={addTodo} />

        <Filter filter={filter} setFilter={setFilter} />

        <div className="mt-6 space-y-2">
          {filteredTodos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              toggleComplete={toggleComplete} 
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
          
          {filteredTodos.length === 0 && todos.length > 0 && (
            <p className="text-gray-400 text-center text-sm">No tasks found in this category.</p>
          )}

          {todos.length === 0 && (
            <p className="text-gray-400 text-center">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App