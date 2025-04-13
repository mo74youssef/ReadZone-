"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

interface LogoutModalProps {
  onClose: () => void
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content logout-modal">
        <h3>Are you sure you want to logout now?</h3>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  )
}
