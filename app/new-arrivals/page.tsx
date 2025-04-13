import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BookCard from "@/components/book-card"
import HeroSection from "@/components/hero-section"
import { getAllBooks } from "@/services/book-service"

export default function NewArrivalsPage() {
  // Get all books and reverse to simulate newest first
  const allBooks = getAllBooks()
  const newArrivals = [...allBooks].reverse()

  return (
    <main>
      <Navigation />
      <HeroSection />

      <div className="book-list-container">
        <h1 className="book-list-title">New Arrivals</h1>

        <div className="section">
          <div className="book-grid-full">
            {newArrivals.map((book) => (
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
