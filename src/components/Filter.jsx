function Filter({ filter, setFilter }) {
  const options = [
    { key: 'all', label: 'All' },
    { key: 'general', label: 'General' },
    { key: 'work', label: 'Work' },
    { key: 'home', label: 'Home' },
    { key: 'urgent', label: 'Urgent' },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
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
  )
}

export default Filter