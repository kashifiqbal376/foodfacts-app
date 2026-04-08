import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch()
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (query) => {
    setHasSearched(true)
    searchFood(query)
  }

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      {error && <ErrorMessage message={error} />}

      {!loading && hasSearched && results.length === 0 && !error && (
        <p>No results found.</p>
      )}

      {!hasSearched && <p>Search for a food to begin.</p>}

      {results.length > 0 && <FoodList products={results} />}
    </div>
  )
}

export default HomePage