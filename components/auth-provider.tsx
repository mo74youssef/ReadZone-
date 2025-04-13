"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  username: string
  email?: string
  avatar?: string
}

type RegisteredUser = {
  username: string
  email: string
  password: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisteredUser) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  deleteAccount: () => Promise<void>
  getRegisteredUsers: () => RegisteredUser[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([])

  useEffect(() => {
    // Check if user is logged in on component mount
    const authStatus = localStorage.getItem("isLoggedIn")
    const userData = localStorage.getItem("userData")
    const storedUsers = localStorage.getItem("registeredUsers")

    if (authStatus === "true" && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }

    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers))
    }
  }, [])

  const getRegisteredUsers = () => {
    return registeredUsers
  }

  const register = async (userData: RegisteredUser): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if email already exists
      const userExists = registeredUsers.some((user) => user.email === userData.email)

      if (userExists) {
        resolve(false)
        return
      }

      // Add new user to registered users
      const newUsers = [...registeredUsers, userData]
      setRegisteredUsers(newUsers)
      localStorage.setItem("registeredUsers", JSON.stringify(newUsers))

      // Auto login after registration
      setUser({
        username: userData.username,
        email: userData.email,
        avatar: userData.avatar,
      })
      setIsLoggedIn(true)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: userData.username,
          email: userData.email,
          avatar: userData.avatar,
        }),
      )

      resolve(true)
    })
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Find user with matching email and password
      const foundUser = registeredUsers.find((user) => user.email === email && user.password === password)

      if (foundUser) {
        setUser({
          username: foundUser.username,
          email: foundUser.email,
          avatar: foundUser.avatar,
        })
        setIsLoggedIn(true)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem(
          "userData",
          JSON.stringify({
            username: foundUser.username,
            email: foundUser.email,
            avatar: foundUser.avatar,
          }),
        )
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userData")
  }

  const updateProfile = async (userData: Partial<User>) => {
    return new Promise<void>((resolve, reject) => {
      try {
        // In a real app, you would make an API call here
        setTimeout(() => {
          if (user) {
            const updatedUser = { ...user, ...userData }
            setUser(updatedUser)
            localStorage.setItem("userData", JSON.stringify(updatedUser))

            // Also update in registered users
            if (user.email) {
              const updatedUsers = registeredUsers.map((regUser) => {
                if (regUser.email === user.email) {
                  return { ...regUser, ...userData }
                }
                return regUser
              })
              setRegisteredUsers(updatedUsers)
              localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
            }

            resolve()
          } else {
            reject(new Error("User not found"))
          }
        }, 500)
      } catch (error) {
        reject(error)
      }
    })
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    return new Promise<void>((resolve, reject) => {
      // In a real app, you would make an API call here
      setTimeout(() => {
        if (user && user.email) {
          // Find user and verify current password
          const userIndex = registeredUsers.findIndex((u) => u.email === user.email && u.password === currentPassword)

          if (userIndex >= 0) {
            // Update password
            const updatedUsers = [...registeredUsers]
            updatedUsers[userIndex].password = newPassword
            setRegisteredUsers(updatedUsers)
            localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
            resolve()
          } else {
            reject(new Error("Current password is incorrect"))
          }
        } else {
          reject(new Error("User not found"))
        }
      }, 500)
    })
  }

  const deleteAccount = async () => {
    return new Promise<void>((resolve, reject) => {
      // In a real app, you would make an API call here
      setTimeout(() => {
        if (user && user.email) {
          // Remove user from registered users
          const updatedUsers = registeredUsers.filter((u) => u.email !== user.email)
          setRegisteredUsers(updatedUsers)
          localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
          logout()
          resolve()
        } else {
          reject(new Error("User not found"))
        }
      }, 500)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        deleteAccount,
        getRegisteredUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
