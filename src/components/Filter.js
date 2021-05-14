import React from 'react'

function Filter({ setSearchTerm, searchTerm }) {

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  const filterPlaceholder = "Enter 'general' to view general highlights"
  
  return (
    <div className="filter-container">
      <label>Filter by Team Name:</label><br/>
      <input type="text" value={searchTerm} onChange={handleChange} placeholder={filterPlaceholder} />
    </div>
  )
}

export default Filter 