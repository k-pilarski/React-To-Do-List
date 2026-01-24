import { useState } from 'react'

function TodoForm({ addTodo, darkMode }) {
  const [value, setValue] = useState("")
  const [category, setCategory] = useState("general")
  const [priority, setPriority] = useState("normal")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return 

    addTodo(value, category, priority, dueDate)
    
    setValue("")
    setCategory("general")
    setPriority("normal")
    setDueDate("")
  }

  const inputClass = `border-2 p-2 rounded-lg focus:outline-none focus:border-blue-500 text-sm transition-colors ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-800'
  }`

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
      <input
        type="text"
        className={`w-full ${inputClass}`}
        placeholder="What do you have to do?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`cursor-pointer ${inputClass}`}
        >
          <option value="general">📂 General</option>
          <option value="work">💼 Work</option>
          <option value="home">🏠 Home</option>
          <option value="urgent">🔥 Urgent</option>
        </select>

        <select 
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`cursor-pointer ${inputClass}`}
        >
          <option value="low">⬇️ Low</option>
          <option value="normal">⏺️ Normal</option>
          <option value="high">⬆️ High</option>
        </select>

        <input 
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`cursor-pointer ${inputClass}`}
          title="Due Date"
        />

        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-bold ml-auto sm:ml-0"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default TodoForm