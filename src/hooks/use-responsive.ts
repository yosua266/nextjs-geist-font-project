"use client"

import { useState, useEffect, useCallback } from "react"

interface Breakpoints {
  sm: number
  md: number
  lg: number
  xl: number
  "2xl": number
}

const defaultBreakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

interface UseResponsiveOptions {
  breakpoints?: Breakpoints
  debounceDelay?: number
}

export function useResponsive({
  breakpoints = defaultBreakpoints,
  debounceDelay = 100,
}: UseResponsiveOptions = {}) {
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

  // Debounce function to prevent excessive updates
  const debounce = useCallback((fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }, [])

  // Update dimensions and device type
  const updateDimensions = useCallback(() => {
    if (typeof window === "undefined") return

    const width = window.innerWidth
    const height = window.innerHeight

    setWindowWidth(width)
    setWindowHeight(height)
    setOrientation(height >= width ? "portrait" : "landscape")

    // Update device type based on breakpoints
    setIsMobile(width < breakpoints.md)
    setIsTablet(width >= breakpoints.md && width < breakpoints.lg)
    setIsDesktop(width >= breakpoints.lg)
  }, [breakpoints])

  // Initialize and set up event listeners
  useEffect(() => {
    if (typeof window === "undefined") return

    // Initial update
    updateDimensions()

    // Add debounced resize listener
    const debouncedUpdateDimensions = debounce(updateDimensions, debounceDelay)
    window.addEventListener("resize", debouncedUpdateDimensions)

    // Add orientation change listener
    window.addEventListener("orientationchange", updateDimensions)

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions)
      window.removeEventListener("orientationchange", updateDimensions)
    }
  }, [updateDimensions, debounce, debounceDelay])

  // Utility functions for breakpoint checks
  const isBreakpoint = useCallback((breakpoint: keyof Breakpoints) => {
    return windowWidth >= breakpoints[breakpoint]
  }, [windowWidth, breakpoints])

  const isBetweenBreakpoints = useCallback((min: keyof Breakpoints, max: keyof Breakpoints) => {
    return windowWidth >= breakpoints[min] && windowWidth < breakpoints[max]
  }, [windowWidth, breakpoints])

  return {
    // Dimensions
    windowWidth,
    windowHeight,
    
    // Device types
    isMobile,
    isTablet,
    isDesktop,
    
    // Orientation
    orientation,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
    
    // Breakpoint utilities
    isBreakpoint,
    isBetweenBreakpoints,
    
    // Raw breakpoints
    breakpoints,
  }
}
