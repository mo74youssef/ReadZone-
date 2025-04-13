"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import UserMenu from "@/components/user-menu"
import ThemeToggle from "@/components/theme-toggle"

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav>
      <Link href="/" className="logo">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20111-n40abdb3CLI37CzR8O4ER2P6E3FBl0.png"
          alt="Read Zone"
          width={120}
          height={45}
        />
      </Link>
      <div className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link href="/library" className={pathname === "/library" ? "active" : ""}>
          Library
        </Link>
        <Link href="/chat" className={pathname === "/chat" ? "active" : ""}>
          ChatRZ
        </Link>
      </div>

      <ThemeToggle />

      <div className="auth-buttons">
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <>
            <Link href="/auth/login" className="btn btn-login">
              Login
            </Link>
            <Link href="/auth/signup" className="btn btn-signup">
              Sign up
            </Link>
          </>
        )}
      </div>
      <button className="menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: "none" }}>
        ☰
      </button>
    </nav>
  )
}
