import React, { useEffect, useState } from 'react'

const Search_Bar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <>

        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center border-2 border-gray-300 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow max-w-150">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-700 bg-transparent outline-none placeholder-gray-400"
            />
          </div>
        </form>
    </>
  )
}

export default Search_Bar