import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import BookCard from "@/components/book-card"
import { getAllBooks } from "@/services/book-service"

export default function SciencePage() {
  // Get all books and filter for science category
  const allBooks = getAllBooks()
  const scienceBooks = allBooks.filter(
    (book) => book.tags.includes("science") || book.id === "3", // Include some books for demo
  )

  return (
    <main>
      <Navigation />
      <HeroSection />

      <div className="categories">
        <Link href="/novel" className="category">
          Novel
        </Link>
        <Link href="/science" className="category active">
          Science
        </Link>
        <Link href="/romance" className="category">
          Romance
        </Link>
        <Link href="/crime" className="category">
          Crime
        </Link>
        <Link href="/education" className="category">
          Education
        </Link>
        <Link href="/psychology" className="category">
          Psychology
        </Link>
      </div>

      <div className="book-list-container">
        <h1 className="book-list-title">Science</h1>

        <div className="section">
          <div className="book-grid-full">
            {scienceBooks.map((book) => (
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
