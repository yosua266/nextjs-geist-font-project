import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combine Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to Indonesian locale
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Format time to Indonesian locale
export function formatTime(time: string): string {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

// Format number to Indonesian format
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num)
}

// Handle API errors
export function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return "Terjadi kesalahan. Silakan coba lagi nanti."
}

// Local Storage Functions
const BOOKMARK_KEY = "dongplay_bookmarks"

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return []
  const bookmarks = localStorage.getItem(BOOKMARK_KEY)
  return bookmarks ? JSON.parse(bookmarks) : []
}

export function addBookmark(animeId: string): void {
  if (typeof window === "undefined") return
  const bookmarks = getBookmarks()
  if (!bookmarks.includes(animeId)) {
    bookmarks.push(animeId)
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks))
  }
}

export function removeBookmark(animeId: string): void {
  if (typeof window === "undefined") return
  const bookmarks = getBookmarks()
  const updatedBookmarks = bookmarks.filter(id => id !== animeId)
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updatedBookmarks))
}

export function isBookmarked(animeId: string): boolean {
  if (typeof window === "undefined") return false
  const bookmarks = getBookmarks()
  return bookmarks.includes(animeId)
}

// Watch History Functions
const HISTORY_KEY = "dongplay_history"

export interface WatchHistoryItem {
  animeId: string
  episodeNumber: number
  timestamp: number
  progress: number
}

export function getWatchHistory(): WatchHistoryItem[] {
  if (typeof window === "undefined") return []
  const history = localStorage.getItem(HISTORY_KEY)
  return history ? JSON.parse(history) : []
}

export function updateWatchHistory(
  animeId: string,
  episodeNumber: number,
  progress: number
): void {
  if (typeof window === "undefined") return
  const history = getWatchHistory()
  const timestamp = Date.now()

  const existingIndex = history.findIndex(
    item => item.animeId === animeId && item.episodeNumber === episodeNumber
  )

  if (existingIndex !== -1) {
    history[existingIndex] = { animeId, episodeNumber, timestamp, progress }
  } else {
    history.unshift({ animeId, episodeNumber, timestamp, progress })
  }

  // Keep only last 100 items
  const trimmedHistory = history.slice(0, 100)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory))
}

export function getWatchProgress(
  animeId: string,
  episodeNumber: number
): number {
  if (typeof window === "undefined") return 0
  const history = getWatchHistory()
  const item = history.find(
    item => item.animeId === animeId && item.episodeNumber === episodeNumber
  )
  return item?.progress || 0
}

// SEO Utils
export function generateMetadata(
  title: string,
  description: string,
  image?: string
) {
  return {
    title: `${title} | DongPlay`,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  }
}

// Validation Utils
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isStrongPassword(password: string): boolean {
  return password.length >= 8 && // minimum length
    /[A-Z]/.test(password) && // has uppercase
    /[a-z]/.test(password) && // has lowercase
    /[0-9]/.test(password) && // has number
    /[^A-Za-z0-9]/.test(password) // has special char
}

// URL Utils
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Array Utils
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// String Utils
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Time Utils
export function timeAgo(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = now.getTime() - past.getTime()

  if (elapsed < msPerMinute) {
    const seconds = Math.round(elapsed/1000)
    return `${seconds} detik yang lalu`
  }
  else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed/msPerMinute)
    return `${minutes} menit yang lalu`
  }
  else if (elapsed < msPerDay ) {
    const hours = Math.round(elapsed/msPerHour)
    return `${hours} jam yang lalu`
  }
  else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed/msPerDay)
    return `${days} hari yang lalu`
  }
  else if (elapsed < msPerYear) {
    const months = Math.round(elapsed/msPerMonth)
    return `${months} bulan yang lalu`
  }
  else {
    const years = Math.round(elapsed/msPerYear)
    return `${years} tahun yang lalu`
  }
}
