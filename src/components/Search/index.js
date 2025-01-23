import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([]) // to store search results
  const history = useHistory()

  // Function to handle input change and update query
  const handleInputChange = event => {
    setQuery(event.target.value)
    // Simulate search results based on input
    if (event.target.value) {
      // Here you can make an API call or filter data
      setResults([
        {id: 1, name: 'Post 1'},
        {id: 2, name: 'Post 2'},
        {id: 3, name: 'Post 3'},
      ])
    } else {
      setResults([])
    }
  }

  // Function to handle search page redirect
  const handleSearch = () => {
    if (query) {
      // Navigate to search results page with query
      history.push(`/search?q=${query}`)
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search posts"
        data-testid="searchInput"
      />
      <button onClick={handleSearch} data-testid="searchIcon">
        Search
      </button>

      {results.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {results.map(result => (
              <li key={result.id}>
                <a href={`/posts/${result.id}`}>{result.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Search
