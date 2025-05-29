"use client"

import { useEffect, useCallback, useRef } from "react"

type KeyCombo = string[]
type ShortcutHandler = (e: KeyboardEvent) => void
type Shortcut = {
  combo: KeyCombo
  handler: ShortcutHandler
  description: string
  preventDefault?: boolean
  allowInInput?: boolean
}

interface UseKeyboardShortcutsOptions {
  shortcuts: Shortcut[]
  enabled?: boolean
}

export function useKeyboardShortcuts({
  shortcuts,
  enabled = true,
}: UseKeyboardShortcutsOptions) {
  // Keep track of currently pressed keys
  const pressedKeys = useRef<Set<string>>(new Set())

  // Check if a key combo matches currently pressed keys
  const isComboPressed = useCallback((combo: KeyCombo) => {
    if (combo.length !== pressedKeys.current.size) return false
    return combo.every(key => pressedKeys.current.has(key.toLowerCase()))
  }, [])

  // Handle keydown events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return

    // Don't trigger shortcuts when typing in input fields unless explicitly allowed
    if (
      !e.target ||
      (e.target instanceof HTMLElement &&
        ["input", "textarea"].includes(e.target.tagName.toLowerCase()) &&
        !shortcuts.find(s => 
          isComboPressed(s.combo) && 
          s.allowInInput
        ))
    ) {
      return
    }

    const key = e.key.toLowerCase()
    pressedKeys.current.add(key)

    // Check each shortcut
    shortcuts.forEach(shortcut => {
      if (isComboPressed(shortcut.combo)) {
        if (shortcut.preventDefault !== false) {
          e.preventDefault()
        }
        shortcut.handler(e)
      }
    })
  }, [enabled, shortcuts, isComboPressed])

  // Handle keyup events
  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    pressedKeys.current.delete(key)
  }, [])

  // Clear pressed keys when window loses focus
  const handleBlur = useCallback(() => {
    pressedKeys.current.clear()
  }, [])

  // Set up event listeners
  useEffect(() => {
    if (!enabled) return

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", handleBlur)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", handleBlur)
    }
  }, [enabled, handleKeyDown, handleKeyUp, handleBlur])

  // Return helper functions
  return {
    // Check if a specific key combo is currently pressed
    isPressed: useCallback((combo: KeyCombo) => isComboPressed(combo), [isComboPressed]),

    // Get all registered shortcuts
    getShortcuts: useCallback(() => shortcuts, [shortcuts]),

    // Get currently pressed keys
    getPressedKeys: useCallback(() => Array.from(pressedKeys.current), []),

    // Check if shortcuts are enabled
    isEnabled: enabled,
  }
}

// Example usage:
/*
const shortcuts = [
  {
    combo: ["Control", "k"],
    handler: () => setIsSearchOpen(true),
    description: "Open search",
    preventDefault: true,
  },
  {
    combo: ["Escape"],
    handler: () => setIsSearchOpen(false),
    description: "Close search",
  },
  {
    combo: ["?"],
    handler: () => setIsHelpOpen(true),
    description: "Show keyboard shortcuts",
  },
  {
    combo: ["j"],
    handler: () => navigateToNextItem(),
    description: "Next item",
    allowInInput: false,
  },
  {
    combo: ["k"],
    handler: () => navigateToPreviousItem(),
    description: "Previous item",
    allowInInput: false,
  },
]

const { isPressed, getShortcuts } = useKeyboardShortcuts({
  shortcuts,
  enabled: !isModalOpen,
})
*/
