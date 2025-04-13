import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import BookCard from "@/components/book-card"
import { getAllBooks } from "@/services/book-service"

export default function CrimePage() {
  // Get all books and filter for crime category
  const allBooks = getAllBooks()
  const crimeBooks = allBooks.filter(
    (book) =>
      book.tags.includes("crime") || book.tags.includes("mystery") || book.tags.includes("thriller") || book.id === "2", // Include some books for demo
  )

  return (
    <main>
      <Navigation />
      <HeroSection />

      <div className="categories">
        <Link href="/novel" className="category">
          Novel
        </Link>
        <Link href="/science" className="category">
          Science
        </Link>
        <Link href="/romance" className="category">
          Romance
        </Link>
        <Link href="/crime" className="category active">
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
        <h1 className="book-list-title">Crime</h1>

        <div className="section">
          <div className="book-grid-full">
            {crimeBooks.map((book) => (
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
