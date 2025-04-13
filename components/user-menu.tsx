"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import LogoutModal from "@/components/logout-modal"

export default function UserMenu() {
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Close menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!user) return null

  return (
    <div className="user-menu-container" ref={menuRef}>
      <div className="user-profile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Image
          src={user.avatar || "/placeholder.svg?height=40&width=40"}
          alt={user.username}
          width={40}
          height={40}
          className="user-avatar"
        />
        <div className="user-info">
          <div className="user-name">{user.username}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="user-dropdown">
          <Link href="/" className="dropdown-item">
            <span className="dropdown-icon">🏠</span>
            Home
          </Link>
          <Link href="/settings" className="dropdown-item">
            <span className="dropdown-icon">⚙️</span>
            Settings
          </Link>
          <button
            className="dropdown-item logout-item"
            onClick={() => {
              setIsMenuOpen(false)
              setShowLogoutModal(true)
            }}
          >
            <span className="dropdown-icon">🚪</span>
            Log out
          </button>
        </div>
      )}

      {showLogoutModal && <LogoutModal onClose={() => setShowLogoutModal(false)} />}
    </div>
  )
}
