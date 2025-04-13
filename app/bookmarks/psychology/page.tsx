import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import BookCard from "@/components/book-card"
import { getAllBooks } from "@/services/book-service"

export default function PsychologyPage() {
  // Get all books and filter for psychology category
  const allBooks = getAllBooks()
  const psychologyBooks = allBooks.filter(
    (book) => book.tags.includes("psychology") || book.tags.includes("self-help") || book.id === "3", // Include some books for demo
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
        <Link href="/crime" className="category">
          Crime
        </Link>
        <Link href="/education" className="category">
          Education
        </Link>
        <Link href="/psychology" className="category active">
          Psychology
        </Link>
      </div>

      <div className="book-list-container">
        <h1 className="book-list-title">Psychology</h1>

        <div className="section">
          <div className="book-grid-full">
            {psychologyBooks.map((book) => (
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
