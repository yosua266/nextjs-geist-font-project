"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseInfiniteScrollOptions<T> {
  initialData?: T[]
  fetchMore: (page: number) => Promise<T[]>
  pageSize?: number
  threshold?: number
  enabled?: boolean
  onError?: (error: Error) => void
}

export function useInfiniteScroll<T>({
  initialData = [],
  fetchMore,
  pageSize = 20,
  threshold = 400,
  enabled = true,
  onError,
}: UseInfiniteScrollOptions<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const currentPage = useRef(1)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<HTMLElement | null>(null)

  // Reset state when initial data changes
  useEffect(() => {
    setData(initialData)
    currentPage.current = 1
    setHasMore(true)
    setError(null)
  }, [initialData])

  // Load more data
  const loadMore = useCallback(async () => {
    if (!enabled || isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      const newItems = await fetchMore(currentPage.current)
      
      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setData(prev => [...prev, ...newItems])
        currentPage.current += 1
        setHasMore(newItems.length >= pageSize)
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to load more items")
      setError(error)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }, [enabled, isLoading, hasMore, fetchMore, pageSize, onError])

  // Set up intersection observer
  const lastElementCallback = useCallback((element: HTMLElement | null) => {
    if (!enabled) return

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: `${threshold}px`,
      }
    )

    if (element) {
      observer.current.observe(element)
      lastElementRef.current = element
    }
  }, [enabled, hasMore, isLoading, threshold, loadMore])

  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  // Manual refresh function
  const refresh = useCallback(async () => {
    currentPage.current = 1
    setData([])
    setHasMore(true)
    setError(null)
    await loadMore()
  }, [loadMore])

  return {
    data,
    isLoading,
    hasMore,
    error,
    refresh,
    lastElementRef: lastElementCallback,
    currentPage: currentPage.current,
  }
}

// Example usage:
/*
interface AnimeEpisode {
  id: string
  title: string
  number: number
}

const {
  data: episodes,
  isLoading,
  hasMore,
  error,
  lastElementRef,
} = useInfiniteScroll<AnimeEpisode>({
  initialData: [],
  fetchMore: async (page) => {
    const response = await fetch(`/api/episodes?page=${page}`)
    const data = await response.json()
    return data.episodes
  },
  pageSize: 20,
  threshold: 400,
  onError: (error) => {
    console.error("Failed to load episodes:", error)
  },
})

// In your JSX:
return (
  <div>
    {episodes.map((episode, index) => (
      <div
        key={episode.id}
        ref={index === episodes.length - 1 ? lastElementRef : undefined}
      >
        Episode {episode.number}: {episode.title}
      </div>
    ))}
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    {!hasMore && <div>No more episodes</div>}
  </div>
)
*/
