"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

export function Footer() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Image src="/marketo-logo.png" alt="Marketo" width={40} height={40} className="h-10 w-10" />
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Marketo
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t("footer.description")}
              </p>
              <div className="flex items-center space-x-4">
                <Link 
                  href="https://www.facebook.com/profile.php?id=61580652337260" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://www.facebook.com/profile.php?id=61580652337260" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-white">{t("footer.quickLinks")}</h3>
              <div className="flex flex-col space-y-3">
                <Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                  {t("footer.allProducts")}
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                  {t("footer.aboutUs")}
                </Link>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                  {t("footer.contactUs")}
                </Link>
                <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                  {t("footer.faq")}
                </Link>
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-white">{t("footer.customerService")}</h3>
              <div className="flex flex-col space-y-3">
                <Link href="/help" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                  {t("footer.helpCenter")}
                </Link>
                <Link href="/returns" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                  {t("footer.returnsExchanges")}
                </Link>
                <Link href="/shipping" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                  {t("footer.shippingInfo")}
                </Link>
                <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                  {t("footer.privacy")}
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-white">{t("footer.contactInfo")}</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">support@marketo.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">+213 077777777</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                  <span className="text-gray-300">123 Algeria Saida<br />Saida, Algeria</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                {t("footer.copyright")}
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <Link href="/terms" className="hover:text-blue-400 transition-colors duration-300">
                  {t("footer.termsOfService")}
                </Link>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-300">
                  {t("footer.privacy")}
                </Link>
                <Link href="/cookies" className="hover:text-blue-400 transition-colors duration-300">
                  {t("footer.cookiePolicy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/marketo-logo.png" alt="Marketo" width={40} height={40} className="h-10 w-10" />
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Marketo
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex items-center space-x-4">
              <Link 
                href="https://www.facebook.com/profile.php?id=61580652337260" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.facebook.com/profile.php?id=61580652337260" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">{t("footer.quickLinks")}</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                {t("footer.allProducts")}
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                {t("footer.aboutUs")}
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                {t("footer.contactUs")}
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                {t("footer.faq")}
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">{t("footer.customerService")}</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/help" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                {t("footer.helpCenter")}
              </Link>
              <Link href="/returns" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                {t("footer.returnsExchanges")}
              </Link>
              <Link href="/shipping" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                {t("footer.shippingInfo")}
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">
                {t("footer.privacy")}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">{t("footer.contactInfo")}</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">support@marketo.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+213562494297</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-300">123 Algeria Saida<br />Saida, Algeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {t("footer.copyright")}
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-blue-400 transition-colors duration-300">
                {t("footer.termsOfService")}
              </Link>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-300">
                {t("footer.privacy")}
              </Link>
              <Link href="/cookies" className="hover:text-blue-400 transition-colors duration-300">
                {t("footer.cookiePolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
