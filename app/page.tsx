"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { productsAPI } from "@/lib/api"
import Image from "next/image"
import { LoadingSpinner } from "@/components/ui/loading"
import { getProductImageUrl } from "@/lib/utils"

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image_url: string
  category: {
    id: number
    name: string
    slug: string
  }
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function HomePage() {
  const { t } = useTranslation()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getAll()
        // Get the first 4 products as featured products
        const products = Array.isArray(response) ? response : (response as any).results || (response as any).data || []
        setFeaturedProducts(products.slice(0, 4))
      } catch (error) {
        console.error("Error fetching featured products:", error)
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-24 min-h-[600px] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight font-sans">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
            <br />
            <span className="text-gray-800">{t("products.title")}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/products">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                {t("hero.shopNow")}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/checkout">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-5 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <Truck className="mr-3 h-6 w-6" />
                {t("hero.delivery")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fast Shipping */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <Truck className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">{t("features.shipping.title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("features.shipping.desc")}</p>
            </CardContent>
          </Card>

          {/* Secure Payment */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-green-50 to-white border-green-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                <Shield className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">{t("features.payment.title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("features.payment.desc")}</p>
            </CardContent>
          </Card>

          {/* 24/7 Support */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-white border-purple-100">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                <Headphones className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-sans">{t("features.support.title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("features.support.desc")}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sans">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {t("products.title")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("products.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" text={t("common.loading")} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-gray-100 overflow-hidden">
                <div className="relative overflow-hidden">
                  <Image
                    src={getProductImageUrl(product.image_url)}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800 shadow-lg">
                      {product.category.name}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 font-sans group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-gray-300" />
                      <span className="text-sm text-gray-500 ml-2">(4.0)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600 font-sans">
                      {Number(product.price).toLocaleString()} DA
                    </span>
                    <Link href={`/products/${product.id}`}>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        {t("products.viewDetails")}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              {t("products.viewAll")}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}