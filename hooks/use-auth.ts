"use client"

import { useState, useEffect } from "react"
import { authStore } from "@/lib/auth-store"

export function useAuth() {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      forceUpdate({})
    })
    return unsubscribe
  }, [])

  return {
    user: authStore.getUser(),
    loading: authStore.isLoading(),
    login: authStore.login.bind(authStore),
    register: authStore.register.bind(authStore),
    logout: authStore.logout.bind(authStore),
  }
}
