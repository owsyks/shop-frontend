import { config } from "./config"

const API_BASE_URL = config.API_BASE_URL

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
}

class AuthStore {
  private user: User | null = null
  private loading = true
  private listeners: (() => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.init()
    }
  }

  private async init() {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth_token")
    if (token) {
      await this.fetchUserProfile(token)
    } else {
      this.loading = false
    }
    this.notify()
  }

  private async fetchUserProfile(token: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const userData = await response.json()
        this.user = userData
      } else {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("auth_token")
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("auth_token")
    } finally {
      this.loading = false
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  getUser() {
    return this.user
  }

  isLoading() {
    return this.loading
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Handle new token structure: data.tokens.access
        if (data.tokens && data.tokens.access) {
          localStorage.setItem("access_token", data.tokens.access)
          if (data.tokens.refresh) {
            localStorage.setItem("refresh_token", data.tokens.refresh)
          }
        } else if (data.access) {
          // Fallback for old structure
          localStorage.setItem("access_token", data.access)
          if (data.refresh) {
            localStorage.setItem("refresh_token", data.refresh)
          }
        }
        
        this.user = data.user
        this.notify()
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string,
    phoneNumber: string,
    address: string,
  ): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirm: password, // Backend expects password confirmation
          username,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          address: address,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Handle new token structure: data.tokens.access
        if (data.tokens && data.tokens.access) {
          localStorage.setItem("access_token", data.tokens.access)
          if (data.tokens.refresh) {
            localStorage.setItem("refresh_token", data.tokens.refresh)
          }
        } else if (data.access) {
          // Fallback for old structure
          localStorage.setItem("access_token", data.access)
          if (data.refresh) {
            localStorage.setItem("refresh_token", data.refresh)
          }
        }
        
        this.user = data.user
        this.notify()
        return true
      } else {
        const errorData = await response.json()
        console.error("Registration error response:", errorData)
        
        // Handle new error format
        if (errorData.errors) {
          // Extract first error message
          const firstError = Object.values(errorData.errors)[0]
          const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError
          throw new Error(errorMessage)
        }
        
        const errorMessage = errorData.message || errorData.detail || "Registration failed"
        throw new Error(errorMessage)
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      throw error
    }
  }

  logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("auth_token") // Remove old token format too
    this.user = null
    this.notify()
  }
}

export const authStore = new AuthStore()
