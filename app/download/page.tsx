"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { getDownloadedBooks, removeFromDownloads, type Book } from "@/services/book-service"

export default function DownloadPage() {
  const { isLoggedIn } = useAuth()
  const [downloadedBooks, setDownloadedBooks] = useState<Book[]>([])

  // Fetch user's downloaded books
  useEffect(() => {
    setDownloadedBooks(getDownloadedBooks())
  }, [])

  const handleDownload = (bookId: string) => {
    // In a real app, this would trigger a download
    alert(`Book download started`)
  }

  const handleRemoveDownload = (bookId: string, title: string) => {
    if (confirm(`هل أنت متأكد من حذف "${title}" من التنزيلات؟`)) {
      removeFromDownloads(bookId)
      setDownloadedBooks(getDownloadedBooks())
    }
  }

  if (!isLoggedIn) {
    return (
      <main>
        <Navigation />
        <div className="hero">
          <div className="hero-content">
            <h1>Please login to view your downloads</h1>
            <Link href="/auth/login" className="btn btn-signup">
              Login
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navigation />

      <div className="hero">
        <div className="hero-content">
          <h1>
            All your books in one place on <span>Read Zone</span>
          </h1>
          <p>Search an easy to find the books with the help of categories</p>
        </div>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/page-not-found%20%282%29-gFfQllB5l4kDbYJUJ4KWp9FUPNP32N.png"
          alt="Book UFO"
          width={200}
          height={200}
          className="hero-image"
        />
      </div>

      <div className="user-collection-container">
        <h1 className="collection-title">Download</h1>
        <div className="book-list">
          {downloadedBooks.length > 0 ? (
            downloadedBooks.map((book) => (
              <div key={book.id} className="book-list-item">
                <div className="book-list-cover">
                  <Link href={`/review/${book.id}`}>
                    <Image
                      src={book.coverImage || "/placeholder.svg"}
                      alt={book.title}
                      width={80}
                      height={120}
                      className="book-cover"
                    />
                  </Link>
                </div>
                <div className="book-list-info">
                  <h3 className="book-list-title">{book.title}</h3>
                </div>
                <div className="book-list-actions">
                  <button
                    className="action-btn download-btn"
                    onClick={() => handleDownload(book.id)}
                    aria-label={`Download ${book.title}`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleRemoveDownload(book.id, book.title)}
                    aria-label={`Remove ${book.title} from downloads`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-collection">
              <p>You haven't downloaded any books yet.</p>
              <Link href="/" className="btn btn-signup">
                Browse Books
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
