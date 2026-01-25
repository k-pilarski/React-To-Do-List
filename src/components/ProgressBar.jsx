function ProgressBar({ total, completed, darkMode }) {
  if (total === 0) return null

  const percentage = Math.round((completed / total) * 100)
  
  const isFinished = percentage === 100
  const barColor = isFinished ? 'bg-green-500' : 'bg-blue-500'

  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs font-bold mb-1">
        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
        <span className={isFinished ? 'text-green-500' : (darkMode ? 'text-gray-200' : 'text-gray-700')}>
          {percentage}%
        </span>
      </div>
      
      <div className={`w-full h-3 rounded-full overflow-hidden ${
        darkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {isFinished && (
        <p className="text-center text-xs mt-2 text-green-500 font-bold animate-pulse">
          🎉 All tasks completed! Great job!
        </p>
      )}
    </div>
  )
}

export default ProgressBar