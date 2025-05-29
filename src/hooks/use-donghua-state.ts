"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  getBookmarks, 
  addBookmark, 
  removeBookmark, 
  isBookmarked,
  getWatchHistory,
  updateWatchHistory,
  getWatchProgress,
  type WatchHistoryItem
} from "@/lib/utils"
import { type Anime } from "@/lib/animeData"

interface UseDonghuaStateProps {
  animeId?: string
  episodeNumber?: number
}

export function useDonghuaState({ animeId, episodeNumber }: UseDonghuaStateProps = {}) {
  const [bookmarkedAnime, setBookmarkedAnime] = useState<string[]>([])
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([])
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true)
      try {
        // Load bookmarks
        const bookmarks = getBookmarks()
        setBookmarkedAnime(bookmarks)

        // Load watch history
        const history = getWatchHistory()
        setWatchHistory(history)

        // Load current progress if animeId and episodeNumber are provided
        if (animeId && episodeNumber) {
          const progress = getWatchProgress(animeId, episodeNumber)
          setCurrentProgress(progress)
        }
      } catch (error) {
        console.error("Error loading donghua state:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [animeId, episodeNumber])

  // Toggle bookmark
  const toggleBookmark = useCallback((id: string) => {
    try {
      if (isBookmarked(id)) {
        removeBookmark(id)
        setBookmarkedAnime(prev => prev.filter(bookmarkId => bookmarkId !== id))
      } else {
        addBookmark(id)
        setBookmarkedAnime(prev => [...prev, id])
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    }
  }, [])

  // Update watch progress
  const updateProgress = useCallback((
    id: string,
    episode: number,
    progress: number
  ) => {
    try {
      updateWatchHistory(id, episode, progress)
      setCurrentProgress(progress)
      
      // Update local watch history state
      setWatchHistory(prev => {
        const timestamp = Date.now()
        const existingIndex = prev.findIndex(
          item => item.animeId === id && item.episodeNumber === episode
        )

        if (existingIndex !== -1) {
          const updated = [...prev]
          updated[existingIndex] = { animeId: id, episodeNumber: episode, timestamp, progress }
          return updated
        }

        return [{ animeId: id, episodeNumber: episode, timestamp, progress }, ...prev]
      })
    } catch (error) {
      console.error("Error updating watch progress:", error)
    }
  }, [])

  // Get recently watched anime
  const getRecentlyWatched = useCallback((limit: number = 10): WatchHistoryItem[] => {
    return watchHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
  }, [watchHistory])

  // Check if an anime is bookmarked
  const checkIsBookmarked = useCallback((id: string): boolean => {
    return bookmarkedAnime.includes(id)
  }, [bookmarkedAnime])

  // Get watch progress for specific anime/episode
  const getProgress = useCallback((id: string, episode: number): number => {
    const historyItem = watchHistory.find(
      item => item.animeId === id && item.episodeNumber === episode
    )
    return historyItem?.progress || 0
  }, [watchHistory])

  // Clear watch history
  const clearWatchHistory = useCallback(() => {
    try {
      localStorage.removeItem("dongplay_history")
      setWatchHistory([])
    } catch (error) {
      console.error("Error clearing watch history:", error)
    }
  }, [])

  // Clear bookmarks
  const clearBookmarks = useCallback(() => {
    try {
      localStorage.removeItem("dongplay_bookmarks")
      setBookmarkedAnime([])
    } catch (error) {
      console.error("Error clearing bookmarks:", error)
    }
  }, [])

  // Get all bookmarked anime IDs
  const getAllBookmarks = useCallback((): string[] => {
    return bookmarkedAnime
  }, [bookmarkedAnime])

  // Get complete watch history
  const getCompleteHistory = useCallback((): WatchHistoryItem[] => {
    return watchHistory
  }, [watchHistory])

  return {
    isLoading,
    currentProgress,
    toggleBookmark,
    updateProgress,
    getRecentlyWatched,
    checkIsBookmarked,
    getProgress,
    clearWatchHistory,
    clearBookmarks,
    getAllBookmarks,
    getCompleteHistory,
  }
}
