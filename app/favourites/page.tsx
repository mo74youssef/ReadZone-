"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { getFavoriteBooks, toggleFavorite, type Book } from "@/services/book-service"

export default function FavouritesPage() {
  const { isLoggedIn } = useAuth()
  const [favouriteBooks, setFavouriteBooks] = useState<Book[]>([])

  // Fetch user's favourite books
  useEffect(() => {
    setFavouriteBooks(getFavoriteBooks())
  }, [])

  const handleToggleFavourite = (bookId: string) => {
    toggleFavorite(bookId)
    setFavouriteBooks(getFavoriteBooks())
  }

  if (!isLoggedIn) {
    return (
      <main>
        <Navigation />
        <div className="hero">
          <div className="hero-content">
            <h1>Please login to view your favourites</h1>
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
          <Link href="/auth/signup" className="btn btn-signup">
            Register
          </Link>
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
        <h1 className="collection-title">Favourites</h1>
        <div className="book-list">
          {favouriteBooks.length > 0 ? (
            favouriteBooks.map((book) => (
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
                  <p className="book-list-author">{book.author}</p>
                </div>
                <button
                  className="action-btn favourite-btn"
                  onClick={() => handleToggleFavourite(book.id)}
                  aria-label={`Remove ${book.title} from favourites`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="empty-collection">
              <p>You haven't added any books to your favourites yet.</p>
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
