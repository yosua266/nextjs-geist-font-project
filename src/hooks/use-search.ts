"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

interface UseSearchOptions<T> {
  initialQuery?: string
  minLength?: number
  debounceDelay?: number
  searchFn?: (query: string) => Promise<T[]>
  onSearch?: (query: string) => void
  updateUrl?: boolean
}

export function useSearch<T>({
  initialQuery = "",
  minLength = 2,
  debounceDelay = 300,
  searchFn,
  onSearch,
  updateUrl = true,
}: UseSearchOptions<T> = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState(initialQuery || searchParams?.get("q") || "")
  const [results, setResults] = useState<T[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const debounceTimeout = useRef<NodeJS.Timeout>()

  // Update URL with search query
  const updateSearchParams = useCallback((newQuery: string) => {
    if (!updateUrl) return

    const current = new URLSearchParams(Array.from(searchParams?.entries() || []))
    
    if (newQuery) {
      current.set("q", newQuery)
    } else {
      current.delete("q")
    }

    const search = current.toString()
    const query = search ? `?${search}` : ""
    
    router.push(`${pathname}${query}`)
  }, [updateUrl, router, pathname, searchParams])

  // Perform search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < minLength) {
      setResults([])
      setError(null)
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      if (searchFn) {
        const searchResults = await searchFn(searchQuery)
        setResults(searchResults)
      }
      
      onSearch?.(searchQuery)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Search failed")
      setError(error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [searchFn, onSearch, minLength])

  // Handle search query changes with debouncing
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    // Update URL immediately
    updateSearchParams(searchQuery)

    // Debounce the search
    debounceTimeout.current = setTimeout(() => {
      performSearch(searchQuery)
    }, debounceDelay)
  }, [debounceDelay, performSearch, updateSearchParams])

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery("")
    setResults([])
    setError(null)
    updateSearchParams("")
  }, [updateSearchParams])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [])

  // Initialize search from URL params
  useEffect(() => {
    const urlQuery = searchParams?.get("q")
    if (urlQuery && urlQuery !== query) {
      handleSearch(urlQuery)
    }
  }, [searchParams, query, handleSearch])

  return {
    query,
    results,
    isSearching,
    error,
    setQuery: handleSearch,
    clearSearch,
    hasResults: results.length > 0,
    isEmpty: query.length >= minLength && !isSearching && results.length === 0,
  }
}

// Example usage:
/*
interface SearchResult {
  id: string
  title: string
  description: string
}

const {
  query,
  results,
  isSearching,
  error,
  setQuery,
  clearSearch,
  hasResults,
  isEmpty,
} = useSearch<SearchResult>({
  minLength: 2,
  debounceDelay: 300,
  searchFn: async (query) => {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    const data = await response.json()
    return data.results
  },
  onSearch: (query) => {
    console.log("Searching for:", query)
  },
  updateUrl: true,
})

// In your JSX:
return (
  <div>
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
    {query && (
      <button onClick={clearSearch}>
        Clear
      </button>
    )}

    {isSearching && <div>Searching...</div>}
    
    {error && <div>Error: {error.message}</div>}
    
    {isEmpty && <div>No results found</div>}
    
    {hasResults && (
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
)
*/
