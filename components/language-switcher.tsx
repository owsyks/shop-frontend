"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    setIsRTL(i18n.language === "ar")
  }, [i18n.language])

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    const isRTL = lang === "ar"
    
    // Update document direction and language
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = lang
    
    // Add/remove RTL class for CSS styling
    if (isRTL) {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
    
    setIsRTL(isRTL)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">
          {i18n.language === "ar" ? "🇩🇿 العربية" : i18n.language === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
        </span>
      </button>

      {isOpen && (
        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50`}>
          <div className="py-1">
            <button
              onClick={() => toggleLanguage("ar")}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors duration-200 ${
                i18n.language === "ar" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              🇩🇿 العربية
            </button>
            <button
              onClick={() => toggleLanguage("fr")}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors duration-200 ${
                i18n.language === "fr" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              🇫🇷 Français
            </button>
            <button
              onClick={() => toggleLanguage("en")}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors duration-200 ${
                i18n.language === "en" ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
