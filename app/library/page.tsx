"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BookCard from "@/components/book-card"
import HeroSection from "@/components/hero-section"
import { getRecentlyPlayed, getBookmarkedBooks, getFavoriteBooks, getDownloadedBooks } from "@/services/book-service"
import { useAuth } from "@/components/auth-provider"

export default function Library() {
  const { isLoggedIn } = useAuth()

  // State to store book collections
  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([])
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [downloads, setDownloads] = useState<any[]>([])

  // Fetch latest data when component mounts or when user logs in/out
  useEffect(() => {
    // Get latest data from services
    setRecentlyPlayed(getRecentlyPlayed().slice(0, 4))
    setBookmarks(getBookmarkedBooks().slice(0, 4))
    setFavorites(getFavoriteBooks().slice(0, 4))
    setDownloads(getDownloadedBooks().slice(0, 4))
  }, [isLoggedIn])

  return (
    <main>
      <Navigation />
      <HeroSection />

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Recently Played</h2>
          <Link href="/recently-played" className="see-all">
            See all ›
          </Link>
        </div>
        {recentlyPlayed.length > 0 ? (
          <div className="book-grid">
            {recentlyPlayed.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                coverImage={book.coverImage}
                rating={book.rating}
              />
            ))}
          </div>
        ) : (
          <div className="empty-section">
            <p>No recently played books yet.</p>
            <Link href="/" className="btn btn-signup">
              Browse Books
            </Link>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Bookmarks</h2>
          <Link href="/bookmarks" className="see-all">
            See all ›
          </Link>
        </div>
        {bookmarks.length > 0 ? (
          <div className="book-grid">
            {bookmarks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                coverImage={book.coverImage}
                rating={book.rating}
              />
            ))}
          </div>
        ) : (
          <div className="empty-section">
            <p>No bookmarked books yet.</p>
            <Link href="/" className="btn btn-signup">
              Browse Books
            </Link>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Favourites</h2>
          <Link href="/favourites" className="see-all">
            See all ›
          </Link>
        </div>
        {favorites.length > 0 ? (
          <div className="book-grid">
            {favorites.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                coverImage={book.coverImage}
                rating={book.rating}
              />
            ))}
          </div>
        ) : (
          <div className="empty-section">
            <p>No favorite books yet.</p>
            <Link href="/" className="btn btn-signup">
              Browse Books
            </Link>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Download</h2>
          <Link href="/download" className="see-all">
            See all ›
          </Link>
        </div>
        {downloads.length > 0 ? (
          <div className="book-grid">
            {downloads.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                coverImage={book.coverImage}
                rating={book.rating}
              />
            ))}
          </div>
        ) : (
          <div className="empty-section">
            <p>No downloaded books yet.</p>
            <Link href="/" className="btn btn-signup">
              Browse Books
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
