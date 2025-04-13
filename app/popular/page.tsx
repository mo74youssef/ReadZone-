import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BookCard from "@/components/book-card"
import HeroSection from "@/components/hero-section"
import { getAllBooks } from "@/services/book-service"

export default function PopularPage() {
  // Get all books and sort by rating (highest first)
  const allBooks = getAllBooks()
  const popularBooks = [...allBooks].sort((a, b) => b.rating - a.rating)

  return (
    <main>
      <Navigation />
      <HeroSection />

      <div className="book-list-container">
        <h1 className="book-list-title">Popular now</h1>

        <div className="section">
          <div className="book-grid-full">
            {popularBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                coverImage={book.coverImage}
                rating={book.rating}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
