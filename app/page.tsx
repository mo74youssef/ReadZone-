import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BookCard from "@/components/book-card"
import HeroSection from "@/components/hero-section"
import SearchForm from "@/components/search-form"
import { getAllBooks } from "@/services/book-service"

export default function Home() {
  // Get all books from the service
  const allBooks = getAllBooks()

  // Filter books for different sections
  const popularBooks = allBooks.slice(0, 7)
  const novelBooks = allBooks
    .filter((book) => book.tags.includes("fiction") || book.tags.includes("fantasy"))
    .slice(0, 7)
  const newArrivals = allBooks.slice(0, 7).reverse()

  return (
    <main>
      <Navigation />
      <HeroSection />

      <SearchForm />

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            <Link href="/popular">Popular now</Link>
          </h2>
          <Link href="/popular" className="see-all">
            See all ›
          </Link>
        </div>
        <div className="book-grid">
          {popularBooks.map((book) => (
            <BookCard key={book.id} id={book.id} title={book.title} coverImage={book.coverImage} rating={book.rating} />
          ))}
        </div>
      </section>

      <div className="categories">
        <Link href="/novel" className="category active">
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
        <Link href="/psychology" className="category">
          Psychology
        </Link>
      </div>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Novel</h2>
          <Link href="/novel" className="see-all">
            See all ›
          </Link>
        </div>
        <div className="book-grid">
          {novelBooks.map((book) => (
            <BookCard key={book.id} id={book.id} title={book.title} coverImage={book.coverImage} rating={book.rating} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <Link href="/new-arrivals" className="see-all">
            See all ›
          </Link>
        </div>
        <div className="book-grid">
          {newArrivals.map((book) => (
            <BookCard key={book.id} id={book.id} title={book.title} coverImage={book.coverImage} rating={book.rating} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
