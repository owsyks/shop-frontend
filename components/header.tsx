"use client"

import type React from "react"
import Link from "next/link"
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Smartphone, Laptop, Headphones, Home, Shirt, Watch, Gamepad2, Car, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useRouter } from "next/navigation"
import "@/lib/i18n"

export function Header() {
  const { user, logout } = useAuth()
  const { getTotalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const { t } = useTranslation()
  const router = useRouter()

  // Category data with icons and subcategories - using correct category IDs
  const categories = [
    {
      name: t("categories.electronics"),
      icon: Smartphone,
      href: "/products?category=1", // Electronics ID
      subcategories: [
        { name: t("categories.electronics.smartphones"), href: "/products?category=101" }, // Smartphones & Tablets ID
        { name: t("categories.electronics.laptops"), href: "/products?category=102" }, // Laptops & Computers ID
        { name: t("categories.electronics.audio"), href: "/products?category=103" }, // Audio & Headphones ID
        { name: t("categories.electronics.cameras"), href: "/products?category=104" }, // Cameras & Accessories ID
        { name: t("categories.electronics.gaming"), href: "/products?category=105" }, // Gaming Consoles ID
      ]
    },
    {
      name: t("categories.fashion"),
      icon: Shirt,
      href: "/products?category=2", // Fashion ID
      subcategories: [
        { name: t("categories.fashion.mens"), href: "/products?category=201" }, // Men's Clothing ID
        { name: t("categories.fashion.womens"), href: "/products?category=202" }, // Women's Clothing ID
        { name: t("categories.fashion.shoes"), href: "/products?category=203" }, // Shoes ID
        { name: t("categories.fashion.bags"), href: "/products?category=204" }, // Bags & Accessories ID
        { name: t("categories.fashion.watches"), href: "/products?category=205" }, // Watches & Jewelry ID
      ]
    },
    {
      name: t("categories.homeKitchen"),
      icon: Home,
      href: "/products?category=3", // Home & Kitchen ID
      subcategories: [
        { name: t("categories.homeKitchen.appliances"), href: "/products?category=301" }, // Appliances ID
        { name: t("categories.homeKitchen.kitchenware"), href: "/products?category=302" }, // Kitchenware ID
        { name: t("categories.homeKitchen.furniture"), href: "/products?category=303" }, // Furniture ID
        { name: t("categories.homeKitchen.decor"), href: "/products?category=304" }, // Home Décor ID
        { name: t("categories.homeKitchen.lighting"), href: "/products?category=305" }, // Lighting ID
      ]
    },
    {
      name: t("categories.sportsGaming"),
      icon: Gamepad2,
      href: "/products?category=4", // Sports & Gaming ID
      subcategories: [
        { name: t("categories.sportsGaming.gym"), href: "/products?category=401" }, // Gym Equipment ID
        { name: t("categories.sportsGaming.sportswear"), href: "/products?category=402" }, // Sportswear ID
        { name: t("categories.sportsGaming.camping"), href: "/products?category=403" }, // Camping & Hiking ID
        { name: t("categories.sportsGaming.bicycles"), href: "/products?category=404" }, // Bicycles ID
        { name: t("categories.sportsGaming.gaming"), href: "/products?category=405" }, // Gaming Accessories ID
      ]
    },
    {
      name: t("categories.automotive"),
      icon: Car,
      href: "/products?category=5", // Automotive ID
      subcategories: [
        { name: t("categories.automotive.car"), href: "/products?category=501" }, // Car Accessories ID
        { name: t("categories.automotive.motorbike"), href: "/products?category=502" }, // Motorbike Accessories ID
        { name: t("categories.automotive.oils"), href: "/products?category=503" }, // Oils & Fluids ID
        { name: t("categories.automotive.tools"), href: "/products?category=504" }, // Tools & Equipment ID
      ]
    },
    {
      name: t("categories.booksOffice"),
      icon: BookOpen,
      href: "/products?category=6", // Books & Office ID
      subcategories: [
        { name: t("categories.booksOffice.printers"), href: "/products?category=601" }, // Printers & Ink ID
        { name: t("categories.booksOffice.furniture"), href: "/products?category=602" }, // Office Furniture ID
        { name: t("categories.booksOffice.school"), href: "/products?category=603" }, // School Supplies ID
        { name: t("categories.booksOffice.stationery"), href: "/products?category=604" }, // Stationery ID
      ]
    },
    {
      name: t("categories.cosmeticsBeauty"),
      icon: Sparkles,
      href: "/products?category=7", // Cosmetics & Beauty ID
      subcategories: [
        { name: t("categories.cosmeticsBeauty.makeup"), href: "/products?category=701" }, // Makeup ID
        { name: t("categories.cosmeticsBeauty.skincare"), href: "/products?category=702" }, // Skincare ID
        { name: t("categories.cosmeticsBeauty.hairCare"), href: "/products?category=703" }, // Hair Care ID
        { name: t("categories.cosmeticsBeauty.fragrances"), href: "/products?category=704" }, // Fragrances ID
        { name: t("categories.cosmeticsBeauty.personalCare"), href: "/products?category=705" }, // Personal Care ID
      ]
    },
  ]

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setCategoriesOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setCategoriesOpen(false)
    }, 200) // 200ms delay before closing
    setHoverTimeout(timeout)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-lg border-b' 
        : 'bg-background/90 backdrop-blur-sm border-b'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img src="/marketo-logo.png" alt="Marketo Logo" className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Marketo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="relative text-foreground hover:text-blue-600 transition-colors duration-300 font-medium group"
            >
              {t("nav.home")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 text-foreground hover:text-blue-600 transition-colors duration-300 font-medium group">
                <span>{t("nav.products")}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${categoriesOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {/* Mega Menu Dropdown */}
              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
                    {categories.map((category, index) => {
                      const IconComponent = category.icon
                      return (
                        <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                          <Link 
                            href={category.href}
                            className="flex items-center space-x-3 text-gray-900 hover:text-blue-600 transition-colors duration-200 group"
                          >
                            <IconComponent className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                            <span className="font-semibold">{category.name}</span>
                          </Link>
                          <div className="mt-2 space-y-1">
                            {category.subcategories.map((subcategory, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subcategory.href}
                                className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 py-1 pl-8"
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* View All Products Link */}
                  <div className="border-t bg-gray-50 p-4">
                    <Link 
                      href="/products"
                      className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                    >
                      <span>{t("categories.viewAll")}</span>
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder={t("products.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-lg">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-lg">
                    <User className="h-5 w-5 mr-2" />
                    {user.first_name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-lg">
                  {t("nav.logout")}
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-lg">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/register" className="text-foreground hover:text-blue-600 transition-colors duration-300 font-medium">
                  {t("nav.signup")}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden hover:bg-blue-50 transition-all duration-300 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder={t("products.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link href="/" className="text-foreground hover:text-blue-600 transition-colors duration-300 py-2 font-medium">
                  {t("nav.home")}
                </Link>
                
                {/* Mobile Categories */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    {t("nav.products")}
                  </div>
                  {categories.map((category, index) => {
                    const IconComponent = category.icon
                    return (
                      <div key={index} className="ml-4 space-y-1">
                        <Link 
                          href={category.href}
                          className="flex items-center space-x-2 text-foreground hover:text-blue-600 transition-colors duration-300 py-1 font-medium"
                        >
                          <IconComponent className="h-4 w-4 text-blue-600" />
                          <span>{category.name}</span>
                        </Link>
                        <div className="ml-6 space-y-1">
                          {category.subcategories.map((subcategory, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subcategory.href}
                              className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300 py-1"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                  <Link href="/products" className="ml-4 text-blue-600 hover:text-blue-700 transition-colors duration-300 py-1 font-medium">
                    {t("categories.viewAll")}
                  </Link>
                </div>
                
                {user ? (
                  <>
                    <Link href="/profile" className="text-foreground hover:text-blue-600 transition-colors duration-300 py-2 font-medium">
                      {t("nav.profile")}
                    </Link>
                    <button
                      onClick={logout}
                      className="text-left text-foreground hover:text-blue-600 transition-colors duration-300 py-2 font-medium"
                    >
                      {t("nav.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-foreground hover:text-blue-600 transition-colors duration-300 py-2 font-medium">
                      {t("nav.login")}
                    </Link>
                    <Link href="/register" className="text-foreground hover:text-blue-600 transition-colors duration-300 py-2 font-medium">
                      {t("nav.signup")}
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
