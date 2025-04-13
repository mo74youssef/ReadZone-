"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import {
  getBookById,
  addToRecentlyPlayed,
  toggleFavorite,
  toggleBookmark,
  addToDownloads,
  isFavorite,
  isBookmarked,
  isDownloaded,
  addCollectionChangeListener,
} from "@/services/book-service"

export default function BookReview({ params }: { params: { id: string } }) {
  const { id } = params
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  // State for action buttons
  const [isFav, setIsFav] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  const [isDownload, setIsDownload] = useState(false)

  // Fetch book data
  useEffect(() => {
    const fetchBook = () => {
      const bookData = getBookById(id)
      if (bookData) {
        setBook(bookData)

        // Add to recently played when viewing book details
        if (isLoggedIn) {
          addToRecentlyPlayed(id)
        }

        // Set initial states
        setIsFav(isFavorite(id))
        setIsBookmark(isBookmarked(id))
        setIsDownload(isDownloaded(id))
      } else {
        // Redirect to 404 or home if book not found
        router.push("/")
      }
      setLoading(false)
    }

    fetchBook()
  }, [id, router, isLoggedIn])

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

  // Handle action buttons
  const handleFavorite = () => {
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
    const newStatus = toggleFavorite(id)
    setIsFav(newStatus)
  }

  const handleBookmark = () => {
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
    const newStatus = toggleBookmark(id)
    setIsBookmark(newStatus)
  }

  const handleDownload = () => {
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
    const newStatus = addToDownloads(id)
    setIsDownload(newStatus || isDownload)
    if (newStatus) {
      alert(`تم بدء تنزيل "${book.title}"`)
    }
  }

  // State for review form
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(0)
  const [reviews, setReviews] = useState<any[]>([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [totalRating, setTotalRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [distribution, setDistribution] = useState<any[]>([])

  // State for modals
  const [showReaderModal, setShowReaderModal] = useState(false)
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [progress, setProgress] = useState(30)
  const [volume, setVolume] = useState(70)

  // Refs
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Initialize review data when book is loaded
  useEffect(() => {
    if (book) {
      setReviews(book.reviews || [])
      setTotalRating(book.ratingStats.average * book.ratingStats.total)
      setTotalReviews(book.ratingStats.total)
      setAverageRating(book.ratingStats.average)
      setDistribution(book.ratingStats.distribution)
    }
  }, [book])

  // Handle Read Now button click
  const handleReadNow = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    setShowReaderModal(true)
  }

  // Handle Now Playing button click
  const handlePlayNow = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    setShowPlayerModal(true)
  }

  // Handle Post review button click
  const handlePostReview = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    if (!reviewText.trim() || reviewRating === 0) {
      return
    }

    // Create new review
    const newReview = {
      id: Date.now(),
      user: "You",
      rating: reviewRating,
      text: reviewText,
      date: "Just now",
    }

    // Add to reviews
    setReviews([newReview, ...reviews])

    // Update rating statistics
    const newTotalRating = totalRating + reviewRating
    const newTotalReviews = totalReviews + 1
    const newAverageRating = Number.parseFloat((newTotalRating / newTotalReviews).toFixed(1))

    setTotalRating(newTotalRating)
    setTotalReviews(newTotalReviews)
    setAverageRating(newAverageRating)

    // Update distribution
    const newDistribution = [...distribution]
    const index = 5 - reviewRating
    newDistribution[index].count += 1

    // Recalculate percentages
    let totalCount = 0
    newDistribution.forEach((item) => {
      totalCount += item.count
    })

    newDistribution.forEach((item) => {
      item.percentage = Math.round((item.count / totalCount) * 100)
    })

    setDistribution(newDistribution)

    // Reset form
    setReviewText("")
    setReviewRating(0)
  }

  // Handle login prompt
  const handleLoginPrompt = () => {
    setShowLoginPrompt(false)
    router.push("/auth/login")
  }

  // Handle see more button
  const handleSeeMore = () => {
    setVisibleReviews(reviews.length)
  }

  // Handle progress bar click
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      const percentage = (x / width) * 100
      setProgress(percentage)
    }
  }

  // Handle play/pause toggle
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Handle chapter selection
  const selectChapter = (index: number) => {
    setCurrentChapter(index)
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseInt(e.target.value))
  }

  // Close modals
  const closeModals = () => {
    setShowReaderModal(false)
    setShowPlayerModal(false)
  }

  if (loading) {
    return (
      <main>
        <Navigation />
        <div className="loading-container">
          <div className="loading">Loading book details...</div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!book) {
    return (
      <main>
        <Navigation />
        <div className="error-container">
          <div className="error-message">Book not found</div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      <HeroSection />

      {showLoginPrompt && (
        <div className="login-prompt">
          <div className="login-prompt-content">
            <h3>Login Required</h3>
            <p>You need to be logged in to use this feature.</p>
            <div className="login-prompt-buttons">
              <button className="btn btn-signup" onClick={handleLoginPrompt}>
                Login Now
              </button>
              <button className="btn btn-login" onClick={() => setShowLoginPrompt(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="book-details">
        <Image
          src={book.coverImage || "/placeholder.svg"}
          alt={book.title}
          width={200}
          height={300}
          className="book-cover"
        />
        <div className="book-info">
          <h2 className="book-title">
            {book.title}: {book.author}
            <span className="book-stars">{"⭐".repeat(Math.round(averageRating))}</span>
          </h2>
          <div className="book-stats">
            <div className="stat">
              <div className="stat-value book-rating">{averageRating.toFixed(1)}</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat">
              <div className="stat-value">{book.pages}</div>
              <div className="stat-label">Pages</div>
            </div>
            <div className="stat">
              <div className="stat-value">{book.language}</div>
              <div className="stat-label">Language</div>
            </div>
          </div>
          <div className="book-actions">
            <button className="btn btn-signup" id="readNowBtn" onClick={handleReadNow}>
              Read now
            </button>
            <button className="btn btn-login" id="playNowBtn" onClick={handlePlayNow}>
              Now Playing ▶
            </button>
          </div>
          <div className="book-action-buttons">
            <button
              className={`action-btn favourite-btn ${isFav ? "active" : ""}`}
              onClick={handleFavorite}
              aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isFav ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Favourite</span>
            </button>
            <button
              className={`action-btn bookmark-btn ${isBookmark ? "active" : ""}`}
              onClick={handleBookmark}
              aria-label={isBookmark ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isBookmark ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Bookmark</span>
            </button>
            <button
              className={`action-btn download-btn ${isDownload ? "active" : ""}`}
              onClick={handleDownload}
              aria-label={isDownload ? "Downloaded" : "Download"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download</span>
            </button>
          </div>
          {book.tags &&
            book.tags.map((tag: string) => (
              <div key={tag} className="tag">
                # {tag}
              </div>
            ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <span>📝</span> Description
        </div>
        <div className="description-content">
          <h3>About Author</h3>
          <p>{book.authorBio}</p>
          <h3>Overview</h3>
          <p>{book.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <span>⭐</span> Ratings & reviews
        </div>
        <div className="rating-summary">
          <div className="overall-rating">
            <div className="rating-value">{averageRating.toFixed(1)}</div>
            <div className="stars">
              {"★".repeat(Math.floor(averageRating))}
              {"☆".repeat(5 - Math.floor(averageRating))}
            </div>
            <div className="review-count">{totalReviews} Reviews</div>
          </div>
          <div className="rating-bars">
            {distribution.map((item) => (
              <div key={item.stars} className="rating-bar">
                <span>{item.stars}</span>
                <div className="bar">
                  <div className="bar-fill" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <span className="bar-count">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="review-form">
          <div className="stars-input">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="star-rating-container">
                <input
                  type="radio"
                  name="rating"
                  id={`star${star}`}
                  value={star}
                  checked={reviewRating === star}
                  onChange={() => setReviewRating(star)}
                />
                <label
                  htmlFor={`star${star}`}
                  className={reviewRating >= star ? "filled" : ""}
                  onClick={() => setReviewRating(star)}
                >
                  ★
                </label>
              </div>
            ))}
          </div>
          <textarea
            placeholder="Add feedback"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <button
            className={`btn ${reviewText.trim() && reviewRating > 0 ? "btn-signup" : "btn-disabled"}`}
            onClick={handlePostReview}
            disabled={!reviewText.trim() || reviewRating === 0}
          >
            Post
          </button>
        </div>

        <div className="reviews-list">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div key={review.id} className="review">
              <div className="review-header">
                <div className="review-avatar">{review.user.charAt(0)}</div>
                <div className="review-info">
                  <h4>{review.user}</h4>
                  <div className="stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <div className="review-date">{review.date}</div>
                </div>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
        {reviews.length > visibleReviews && (
          <button className="btn-see-more" onClick={handleSeeMore}>
            See more
          </button>
        )}
      </section>

      {/* Reader Modal */}
      {showReaderModal && (
        <div className="modal" onClick={closeModals}>
          <div className="modal-content reader-modal" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModals}>
              &times;
            </span>
            <h2>{book.title} - Chapter 1</h2>
            <div className="reader-content">
              <p>The morning began like any other, with the soft patter of rain against the windowpane...</p>
              <p>{book.description.split(".")[0]}.</p>
              <p>{book.description.split(".")[1] || "The story continues with fascinating twists and turns."}.</p>
              <p>
                As the plot thickens, the characters face unexpected challenges and revelations that will keep you
                turning pages.
              </p>
              <p>
                The ending will surprise you in ways you never imagined, bringing the story full circle with a
                satisfying conclusion.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Audio Player Modal */}
      {showPlayerModal && (
        <div className="modal" onClick={closeModals}>
          <div className="modal-content player-modal" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModals}>
              &times;
            </span>
            <div className="player-container">
              <div className="player-header">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
              </div>

              <div className="audio-progress">
                <div className="time-display">
                  <span id="currentTime">00:44</span>
                  <span id="totalTime">1:00:00</span>
                </div>
                <div className="progress-bar" ref={progressBarRef} onClick={handleProgressBarClick}>
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="player-controls">
                <button className="control-button" id="prevButton">
                  ⏮
                </button>
                <button className="control-button play-button" id="playButton" onClick={togglePlayPause}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="control-button" id="nextButton">
                  ⏭
                </button>
              </div>

              <div className="volume-control">
                <span className="volume-icon">🔊</span>
                <input
                  type="range"
                  className="volume-slider"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>

              <div className="chapters-list">
                {[
                  { title: `Chapter 01: ${book.title} Introduction`, duration: "27:45" },
                  { title: `Chapter 02: ${book.title} Part 1`, duration: "25:30" },
                  { title: `Chapter 03: ${book.title} Part 2`, duration: "30:15" },
                  { title: `Chapter 04: ${book.title} Part 3`, duration: "28:20" },
                  { title: `Chapter 05: ${book.title} Part 4`, duration: "26:45" },
                  { title: `Chapter 06: ${book.title} Conclusion`, duration: "29:10" },
                ].map((chapter, index) => (
                  <div
                    key={index}
                    className={`chapter ${currentChapter === index ? "active" : ""}`}
                    onClick={() => selectChapter(index)}
                  >
                    <span>{chapter.title}</span>
                    <span>{chapter.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
