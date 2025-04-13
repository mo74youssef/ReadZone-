"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import {
  toggleFavorite,
  toggleBookmark,
  addToDownloads,
  addToRecentlyPlayed,
  isFavorite,
  isBookmarked,
  isDownloaded,
  addCollectionChangeListener,
} from "@/services/book-service"

interface BookCardProps {
  id: string
  title: string
  coverImage: string
  rating: number
  author?: string
  showActions?: boolean
}

export default function BookCard({ id, title, coverImage, rating, author, showActions = true }: BookCardProps) {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const [isFav, setIsFav] = useState(isFavorite(id))
  const [isBookmark, setIsBookmark] = useState(isBookmarked(id))
  const [isDownload, setIsDownload] = useState(isDownloaded(id))

  // Update state when collections change
  useEffect(() => {
    const updateState = () => {
      setIsFav(isFavorite(id))
      setIsBookmark(isBookmarked(id))
      setIsDownload(isDownloaded(id))
    }

    // Add listener for collection changes
    const removeListener = addCollectionChangeListener(updateState)

    // Cleanup listener on unmount
    return () => removeListener()
  }, [id])

  const handleClick = () => {
    // Add to recently played when clicking on a book
    if (isLoggedIn) {
      addToRecentlyPlayed(id)
    }
    router.push(`/review/${id}`)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigating to book details
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
    const newStatus = toggleFavorite(id)
    setIsFav(newStatus)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigating to book details
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
    const newStatus = toggleBookmark(id)
    setIsBookmark(newStatus)
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigating to book details
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
    const newStatus = addToDownloads(id)
    setIsDownload(newStatus || isDownload)
    if (newStatus) {
      alert(`تم بدء تنزيل "${title}"`)
    }
  }

  return (
    <div className="book-card" onClick={handleClick}>
      <div className="book-card-image-container">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={title}
          width={150}
          height={225}
          className="book-card-image"
        />

        {showActions && (
          <div className="book-card-actions">
            <button
              className={`book-action-btn favorite-btn ${isFav ? "active" : ""}`}
              onClick={handleFavorite}
              aria-label={isFav ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isFav ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>

            <button
              className={`book-action-btn bookmark-btn ${isBookmark ? "active" : ""}`}
              onClick={handleBookmark}
              aria-label={isBookmark ? "إزالة من العلامات المرجعية" : "إضافة إلى العلامات المرجعية"}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isBookmark ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>

            <button
              className={`book-action-btn download-btn ${isDownload ? "active" : ""}`}
              onClick={handleDownload}
              aria-label={isDownload ? "تم التنزيل" : "تنزيل"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <span className="book-rating">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          {rating}
        </span>
      </div>
    </div>
  )
}
