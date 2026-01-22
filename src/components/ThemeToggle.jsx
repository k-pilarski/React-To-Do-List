function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-lg transition-colors ${
        darkMode 
          ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
          : 'bg-yellow-100 text-orange-500 hover:bg-yellow-200'
      }`}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle