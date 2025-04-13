"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

interface DeleteAccountModalProps {
  onClose: () => void
}

export default function DeleteAccountModal({ onClose }: DeleteAccountModalProps) {
  const router = useRouter()
  const { deleteAccount } = useAuth()

  const handleDelete = async () => {
    try {
      await deleteAccount()
      router.push("/")
    } catch (error) {
      console.error("Error deleting account:", error)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <h3>Are you sure you want to Delete now?</h3>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  )
}
