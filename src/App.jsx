import { useState, useEffect } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Toaster, toast } from 'react-hot-toast'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import Filter from './components/Filter'
import Search from './components/Search'
import ThemeToggle from './components/ThemeToggle'
import ProgressBar from './components/ProgressBar'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode === "true"
  })

  const [filter, setFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState(null)
  const [search, setSearch] = useState("")

  const [animationParent] = useAutoAnimate()

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  const addTodo = (text, category, priority, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      category: category,
      priority: priority,
      dueDate: dueDate,
      isCompleted: false
    }
    setTodos([...todos, newTodo])
    toast.success('Task added successfully!')
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted }
      }
      return todo
    }))
  }

  const deleteTodo = (id) => {
    const taskToDelete = todos.find(todo => todo.id === id)
    
    setTodos(todos.filter(todo => todo.id !== id))

    toast((t) => (
      <div className="flex items-center gap-2">
        <span>Task deleted</span>
        <button 
          onClick={() => {
            setTodos((prev) => [...prev, taskToDelete])
            toast.dismiss(t.id)
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded text-xs font-bold transition-colors"
        >
          UNDO
        </button>
      </div>
    ), { 
      icon: '🗑️',
      duration: 4000
    })
  }

  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.isCompleted))
    toast.success('Cleaned up completed tasks!')
  }

  const editTodo = (id, newText, newCategory, newPriority, newDueDate) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { 
        ...todo, 
        text: newText, 
        category: newCategory, 
        priority: newPriority, 
        dueDate: newDueDate
      } : todo
    ))
    toast.success('Task updated!')
  }

  const getProcessedTodos = () => {
    let result = todos.filter(todo => {
      if (filter === 'all') return true
      return todo.category === filter
    })

    if (search) {
      result = result.filter(todo => 
        todo.text.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sortOrder) {
      const priorityWeight = { high: 3, normal: 2, low: 1 }
      result.sort((a, b) => {
        const weightA = priorityWeight[a.priority] || 2
        const weightB = priorityWeight[b.priority] || 2
        return sortOrder === 'desc' ? weightB - weightA : weightA - weightB
      })
    }
    return result
  }

  const displayedTodos = getProcessedTodos()
  
  const totalTasks = todos.length
  const completedTasks = todos.filter(t => t.isCompleted).length
  
  const activeCount = totalTasks - completedTasks
  const hasCompleted = completedTasks > 0

  return (
    <div className={`min-h-screen w-full flex items-center justify-center py-10 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
          },
        }}
      />

      <div className={`p-8 rounded-xl shadow-lg w-full max-w-2xl relative transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center flex-1">My To Do List</h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <ProgressBar total={totalTasks} completed={completedTasks} darkMode={darkMode} />
        
        <TodoForm addTodo={addTodo} darkMode={darkMode} />
        <Search search={search} setSearch={setSearch} darkMode={darkMode} />
        
        <Filter 
          filter={filter} 
          setFilter={setFilter} 
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          darkMode={darkMode}
        />

        <div ref={animationParent} className="mt-6 space-y-2">
          {displayedTodos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              toggleComplete={toggleComplete} 
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              darkMode={darkMode}
            />
          ))}
          
          {displayedTodos.length === 0 && todos.length > 0 && (
            <p className={`text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              No tasks match your search.
            </p>
          )}

          {todos.length === 0 && (
            <p className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              No tasks yet. Add one above!
            </p>
          )}
        </div>

        <div className={`mt-8 flex justify-between items-center border-t pt-4 ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
            {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
          </span>

          {hasCompleted && (
            <button 
              onClick={deleteCompleted}
              className="text-red-500 hover:text-red-700 text-sm font-medium hover:underline transition-colors flex items-center gap-1"
            >
              🗑️ Clear Completed
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default App