"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"

export default function HeroSection() {
  const { isLoggedIn } = useAuth()

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          All your books in one place on <span>Read Zone</span>
        </h1>
        <p>Search an easy to find the books with the help of categories</p>
        {!isLoggedIn && (
          <Link href="/auth/signup" className="btn btn-signup">
            Register
          </Link>
        )}
      </div>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/page-not-found%20%282%29-gFfQllB5l4kDbYJUJ4KWp9FUPNP32N.png"
        alt="Book UFO"
        width={200}
        height={200}
        className="hero-image"
      />
    </section>
  )
}
