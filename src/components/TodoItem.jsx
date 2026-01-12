import { useState } from 'react'

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false)

    const [newText, setNewText] = useState(todo.text)

    const handleSave = () => {
        editTodo(todo.id, newText)
        setIsEditing(false)
    }
  
    return (
    <div className="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      
      {isEditing ? (
        <input 
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 border-b-2 border-blue-500 focus:outline-none mr-4 px-1"
          autoFocus
        />
      ) : (
        <span 
          onClick={() => toggleComplete(todo.id)}
          className={`flex-1 cursor-pointer text-lg select-none ${
            todo.isCompleted 
              ? 'line-through text-gray-400' 
              : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-2">
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