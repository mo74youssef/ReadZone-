"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"

export default function EditProfileForm() {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfile({
        ...formData,
        avatar: avatarPreview,
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  if (!isEditing) {
    return (
      <div className="profile-view">
        <div className="profile-header">
          <h2>Profile Information</h2>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit profile
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-avatar">
            <Image
              src={user?.avatar || "/placeholder.svg?height=100&width=100"}
              alt="Profile"
              width={100}
              height={100}
              className="avatar-image"
            />
          </div>
          <div className="profile-details">
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="avatar-upload">
          <div className="avatar-preview" onClick={triggerFileInput}>
            <Image
              src={avatarPreview || "/placeholder.svg?height=100&width=100"}
              alt="Profile"
              width={100}
              height={100}
              className="avatar-image"
            />
            <div className="avatar-overlay">
              <span>Change</span>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Current Password (to confirm changes)</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-update">
            Update
          </button>
          <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
