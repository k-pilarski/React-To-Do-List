function Filter({ filter, setFilter, sortOrder, setSortOrder }) {
  const options = [
    { key: 'all', label: 'All' },
    { key: 'general', label: 'General' },
    { key: 'work', label: 'Work' },
    { key: 'home', label: 'Home' },
    { key: 'urgent', label: 'Urgent' },
  ]

  const handleSortClick = () => {
    if (!sortOrder) {
      setSortOrder('desc')
    } else if (sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder(null)
    }
  }

  const getSortLabel = () => {
    if (sortOrder === 'desc') return 'High to Low ⬇'
    if (sortOrder === 'asc') return 'Low to High ⬆'
    return 'Sort Priority ↕'
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => setFilter(option.key)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
              filter === option.key
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button 
        onClick={handleSortClick}
        className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors flex items-center gap-1 border min-w-[140px] justify-center ${
          sortOrder 
            ? 'bg-blue-100 text-blue-700 border-blue-200' 
            : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
        }`}
      >
        {getSortLabel()}
      </button>
    </div>
  )
}

export default Filter