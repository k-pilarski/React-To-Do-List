function Search({ search, setSearch }) {
  return (
    <div className="mb-4 relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        🔍
      </span>
      
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full border-2 border-gray-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-blue-50 transition-colors text-gray-600 placeholder-gray-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default Search