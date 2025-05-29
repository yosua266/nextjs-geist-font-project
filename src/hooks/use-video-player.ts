"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { playerConfig } from "@/config/site"

interface UseVideoPlayerProps {
  onTimeUpdate?: (currentTime: number) => void
  onEnded?: () => void
  initialVolume?: number
  autoplay?: boolean
}

export function useVideoPlayer({
  onTimeUpdate,
  onEnded,
  initialVolume = playerConfig.defaultVolume,
  autoplay = playerConfig.autoplay,
}: UseVideoPlayerProps = {}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(initialVolume)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [quality, setQuality] = useState(playerConfig.quality.default)
  const [selectedSubtitle, setSelectedSubtitle] = useState(playerConfig.subtitles.default)

  // Initialize video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = initialVolume
      if (autoplay) {
        videoRef.current.play().catch(() => {
          // Autoplay failed - probably due to browser policy
          setIsPlaying(false)
        })
      }
    }
  }, [initialVolume, autoplay])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return

      const { shortcuts } = playerConfig
      const key = e.key.toLowerCase()

      switch (key) {
        case shortcuts.play:
          togglePlay()
          break
        case shortcuts.fullscreen:
          toggleFullscreen()
          break
        case shortcuts.mute:
          toggleMute()
          break
        case shortcuts.seekBackward:
          seek(currentTime - 10)
          break
        case shortcuts.seekForward:
          seek(currentTime + 10)
          break
        case shortcuts.volumeUp:
          setVolume(prev => Math.min(1, prev + 0.1))
          break
        case shortcuts.volumeDown:
          setVolume(prev => Math.max(0, prev - 0.1))
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentTime])

  // Update volume when changed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    
    if (isMuted) {
      videoRef.current.volume = volume
    } else {
      videoRef.current.volume = 0
    }
    setIsMuted(!isMuted)
  }, [isMuted, volume])

  const toggleFullscreen = useCallback(() => {
    if (!videoRef.current) return

    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  const seek = useCallback((time: number) => {
    if (!videoRef.current) return
    
    const newTime = Math.max(0, Math.min(time, duration))
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return

    const time = videoRef.current.currentTime
    setCurrentTime(time)
    onTimeUpdate?.(time)
  }, [onTimeUpdate])

  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
  }, [])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    onEnded?.()
  }, [onEnded])

  const handleWaiting = useCallback(() => {
    setIsBuffering(true)
  }, [])

  const handlePlaying = useCallback(() => {
    setIsBuffering(false)
  }, [])

  const changePlaybackRate = useCallback((rate: number) => {
    if (!videoRef.current) return
    videoRef.current.playbackRate = rate
    setPlaybackRate(rate)
  }, [])

  const changeQuality = useCallback((newQuality: string) => {
    setQuality(newQuality)
    // In a real implementation, you would switch video sources here
  }, [])

  const changeSubtitle = useCallback((language: string) => {
    setSelectedSubtitle(language)
    // In a real implementation, you would switch subtitle tracks here
  }, [])

  return {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isFullscreen,
    isBuffering,
    playbackRate,
    quality,
    selectedSubtitle,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    seek,
    setVolume,
    changePlaybackRate,
    changeQuality,
    changeSubtitle,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    handleWaiting,
    handlePlaying,
  }
}
