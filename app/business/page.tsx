import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import BookCard from "@/components/book-card"
import { getAllBooks } from "@/services/book-service"

export default function BusinessPage() {
  // Get all books and filter for business category
  const allBooks = getAllBooks()
  const businessBooks = allBooks.filter(
    (book) => book.tags.includes("business") || book.tags.includes("finance") || book.id === "2", // Include some books for demo
  )

  return (
    <main>
      <Navigation />
      <HeroSection />

      <div className="book-list-container">
        <h1 className="book-list-title">Business</h1>

        <div className="section">
          <div className="book-grid-full">
            {businessBooks.map((book) => (
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
