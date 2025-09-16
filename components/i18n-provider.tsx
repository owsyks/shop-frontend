"use client"

import type React from "react"
import { useEffect } from "react"
import "@/lib/i18n"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize i18n on client side only
    if (typeof window !== 'undefined') {
      import("@/lib/i18n").then((i18n) => {
        // Set initial language and direction
        const savedLanguage = localStorage.getItem('i18nextLng') || 'en'
        const isRTL = savedLanguage === 'ar'
        
        // Update document attributes
        document.documentElement.lang = savedLanguage
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
        
        // Add RTL class to body for CSS styling
        if (isRTL) {
          document.body.classList.add('rtl')
        } else {
          document.body.classList.remove('rtl')
        }
      })
    }
  }, [])

  return <>{children}</>
}
