"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import EditProfileForm from "@/components/edit-profile-form"
import ChangePasswordForm from "@/components/change-password-form"
import DeleteAccountModal from "@/components/delete-account-modal"

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (!user) {
    router.push("/auth/login")
    return null
  }

  return (
    <main>
      <Navigation />

      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>

        <div className="settings-options">
          <div className="settings-section">
            <EditProfileForm />
          </div>

          <div className="settings-section">
            <ChangePasswordForm />
          </div>

          <div className="settings-section">
            <button className="btn-delete-account" onClick={() => setShowDeleteModal(true)}>
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />}

      <Footer />
    </main>
  )
}
