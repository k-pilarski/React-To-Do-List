function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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

      <button 
        onClick={() => deleteTodo(todo.id)}
        className="ml-4 bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
      >
        Delete
      </button>
    </div>
  )
}

export default TodoItem