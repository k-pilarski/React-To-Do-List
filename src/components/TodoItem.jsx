import { useState } from 'react'

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo, darkMode }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(todo.text)
  const [newCategory, setNewCategory] = useState(todo.category)
  const [newPriority, setNewPriority] = useState(todo.priority || "normal")

  const categoryConfig = {
    general: { label: 'General', style: 'bg-gray-200 text-gray-600' },
    work:    { label: 'Work',    style: 'bg-blue-100 text-blue-600' },
    home:    { label: 'Home',    style: 'bg-green-100 text-green-600' },
    urgent:  { label: 'Urgent',  style: 'bg-red-100 text-red-600 border border-red-200' }
  }

  const priorityConfig = {
    normal: { label: 'Normal', style: 'hidden' }, 
    low:    { label: 'Low',    style: 'bg-green-100 text-green-600 border border-green-200' },
    high:   { label: 'High',   style: 'bg-red-100 text-red-600 border border-red-200' },
  }

  const currentCategory = categoryConfig[todo.category] || categoryConfig.general
  const currentPriority = priorityConfig[todo.priority] || priorityConfig.normal

  const handleSave = () => {
    editTodo(todo.id, newText, newCategory, newPriority)
    setIsEditing(false)
  }

  const getBorderColor = () => {
    if (todo.isCompleted) return darkMode ? 'border-gray-700' : 'border-gray-100'
    if (todo.priority === 'high') return 'border-l-4 border-l-red-500'
    if (todo.priority === 'low')  return 'border-l-4 border-l-green-500'
    return darkMode ? 'border-gray-700' : 'border-gray-100'
  }

  return (
    <div className={`flex justify-between items-center p-4 mb-2 rounded-lg shadow-sm border hover:shadow-md transition-all ${getBorderColor()} ${
      darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-100'
    }`}>
      
      <div className="flex-1 flex items-center gap-3 overflow-hidden">
        
        <div 
          onClick={() => toggleComplete(todo.id)}
          className={`w-5 h-5 rounded-full border-2 cursor-pointer flex items-center justify-center flex-shrink-0 ${
            todo.isCompleted 
              ? 'bg-green-500 border-green-500' 
              : (darkMode ? 'border-gray-500' : 'border-gray-300')
          }`}
        >
          {todo.isCompleted && <span className="text-white text-xs">✓</span>}
        </div>

        {isEditing ? (
          <div className="flex flex-col w-full gap-2 pr-4">
            <input 
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className={`w-full border-b-2 focus:outline-none px-1 ${
                darkMode 
                  ? 'bg-gray-700 text-white border-blue-400 placeholder-gray-400' 
                  : 'bg-white text-gray-700 border-blue-500'
              }`}
              autoFocus 
            />
            <div className="flex gap-2">
               <button onClick={handleSave} className="text-green-500 font-bold text-sm">Save</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
             <span 
              onClick={() => toggleComplete(todo.id)}
              className={`cursor-pointer text-lg select-none truncate ${
                todo.isCompleted 
                  ? (darkMode ? 'line-through text-gray-500' : 'line-through text-gray-400')
                  : (darkMode ? 'text-gray-100' : 'text-gray-800')
              }`}
            >
              {todo.text}
            </span>
            
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full w-fit ${currentCategory.style}`}>
                {currentCategory.label}
              </span>

              {todo.priority !== 'normal' && (
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full w-fit ${currentPriority.style}`}>
                  {currentPriority.label}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 ml-4 self-start sm:self-center">
        {isEditing ? null : (
          <>
          <button 
            onClick={() => {
              setIsEditing(true)
              setNewText(todo.text)
              setNewCategory(todo.category)
              setNewPriority(todo.priority)
            }}
            className="text-yellow-600 hover:bg-yellow-50 px-2 py-1 rounded transition-colors font-medium text-sm"
          >
            Edit
          </button>
          <button 
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors font-medium text-sm"
          >
            Delete
          </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem