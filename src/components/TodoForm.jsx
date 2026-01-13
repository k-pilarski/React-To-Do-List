import { useState } from 'react'

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("")

  const [category, setCategory] = useState("general")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!value) return 

    addTodo(value, category)
    setValue("")
    setCategory("general")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        className="border-2 border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="What do you have to do?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
      >
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="home">Home</option>
        <option value="urgent">Urgent</option>
      </select>

      <button 
        type="submit" 
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-bold"
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm