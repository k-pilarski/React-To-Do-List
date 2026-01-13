import { useState } from 'react'

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false)

    const [newText, setNewText] = useState(todo.text)

    const categoryConfig = {
      general: { label: 'General', style: 'bg-gray-200 text-gray-600' },
      work:    { label: 'Work',  style: 'bg-blue-100 text-blue-600' },
      home:    { label: 'Home',    style: 'bg-green-100 text-green-600' },
      urgent:  { label: 'Urgent',  style: 'bg-red-100 text-red-600 border border-red-200' }
    }

    const currentCategory = categoryConfig[todo.category] || categoryConfig.general

    const handleSave = () => {
        editTodo(todo.id, newText)
        setIsEditing(false)
    }
  
    return (
    <div className="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      
      <div className="flex-1 flex items-center gap-3 overflow-hidden">
        
        <div 
          onClick={() => toggleComplete(todo.id)}
          className={`w-5 h-5 rounded-full border-2 cursor-pointer flex items-center justify-center flex-shrink-0 ${
            todo.isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'
          }`}
        >
          {todo.isCompleted && <span className="text-white text-xs">✓</span>}
        </div>

        {isEditing ? (
          <input 
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full border-b-2 border-blue-500 focus:outline-none px-1 text-gray-700"
            autoFocus 
          />
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
             <span 
              onClick={() => toggleComplete(todo.id)}
              className={`cursor-pointer text-lg select-none truncate ${
                todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {todo.text}
            </span>
            
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full w-fit ${currentCategory.style}`}>
              {currentCategory.label}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 ml-4">
        {isEditing ? (
          <button 
            onClick={handleSave}
            className="text-green-600 hover:bg-green-50 px-2 py-1 rounded transition-colors font-medium text-sm"
          >
            Save
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-yellow-600 hover:bg-yellow-50 px-2 py-1 rounded transition-colors font-medium text-sm"
          >
            Edit
          </button>
        )}

        <button 
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors font-medium text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem