"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Here you would typically handle form submission, validation, etc.
    setTimeout(() => {
      // Navigate to OTP verification page
      router.push("/auth/otp")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-logo">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20111-n40abdb3CLI37CzR8O4ER2P6E3FBl0.png"
              alt="Read Zone"
              width={120}
              height={45}
              className="logo-image"
            />
          </div>
          <div className="auth-illustration">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/28773560_7461477%201-GZgBC8b3qbiQZkCOmEm3D13Y5GiBlE.png"
              alt="Forgot Password Illustration"
              width={400}
              height={400}
              className="illustration-img"
            />
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <h1 className="auth-title">
              Forgot
              <br />
              your Password?
            </h1>

            <p className="auth-description">
              Please enter the email address you'd like your password reset information sent to
            </p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <input
                  type="text"
                  placeholder="Email Address/ Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-input-underline"
                />
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
