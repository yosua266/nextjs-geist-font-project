"use client"

import { useState, useEffect, useCallback } from "react"

type Theme = "light" | "dark" | "system"

interface UseThemeOptions {
  defaultTheme?: Theme
  storageKey?: string
}

export function useTheme({
  defaultTheme = "system",
  storageKey = "dongplay_theme",
}: UseThemeOptions = {}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  // Get system theme preference
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }, [])

  // Update resolved theme based on current theme setting
  const updateResolvedTheme = useCallback(() => {
    const resolved = theme === "system" ? getSystemTheme() : theme
    setResolvedTheme(resolved)
    
    // Update document class
    if (typeof document !== "undefined") {
      const root = document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(resolved)
    }
  }, [theme, getSystemTheme])

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === "undefined") return

    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored) {
      setTheme(stored)
    }
  }, [storageKey])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === "system") {
        updateResolvedTheme()
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, updateResolvedTheme])

  // Update resolved theme whenever theme changes
  useEffect(() => {
    updateResolvedTheme()
  }, [theme, updateResolvedTheme])

  // Set theme and save to localStorage
  const setThemeWithPersist = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem(storageKey, newTheme)
  }, [storageKey])

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setThemeWithPersist(newTheme)
  }, [resolvedTheme, setThemeWithPersist])

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeWithPersist,
    toggleTheme,
    isSystem: theme === "system",
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
  }
}

// Example usage:
/*
const { 
  theme,           // Current theme setting ('light', 'dark', or 'system')
  resolvedTheme,   // Actual theme being applied ('light' or 'dark')
  setTheme,        // Function to set theme
  toggleTheme,     // Function to toggle between light and dark
  isSystem,        // Whether system theme is being used
  isDark,          // Whether dark theme is active
  isLight         // Whether light theme is active
} = useTheme()

// Set specific theme
setTheme('dark')

// Toggle between light and dark
toggleTheme()

// Check current theme
if (isDark) {
  // Apply dark theme styles
}

// Use in JSX
<button onClick={toggleTheme}>
  {isDark ? "Switch to Light" : "Switch to Dark"}
</button>
*/
