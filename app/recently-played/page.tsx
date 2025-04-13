"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BookCard from "@/components/book-card"
import HeroSection from "@/components/hero-section"
import { getRecentlyPlayed, type Book } from "@/services/book-service"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export default function RecentlyPlayedPage() {
  const { isLoggedIn } = useAuth()
  const [recentlyPlayed, setRecentlyPlayed] = useState<Book[]>([])

  // Fetch user's recently played books
  useEffect(() => {
    setRecentlyPlayed(getRecentlyPlayed())
  }, [])

  if (!isLoggedIn) {
    return (
      <main>
        <Navigation />
        <div className="hero">
          <div className="hero-content">
            <h1>Please login to view your recently played books</h1>
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
      <HeroSection />

      <div className="book-list-container">
        <h1 className="book-list-title">Recently Played</h1>

        <div className="section">
          {recentlyPlayed.length > 0 ? (
            <div className="book-grid-full">
              {recentlyPlayed.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  coverImage={book.coverImage}
                  rating={book.rating}
                />
              ))}
            </div>
          ) : (
            <div className="empty-collection">
              <p>You haven't played any books yet.</p>
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
