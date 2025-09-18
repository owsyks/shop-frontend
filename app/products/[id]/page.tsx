"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { Star, ShoppingCart, ArrowLeft, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { productsAPI } from "@/lib/api"
import ProductRating from "@/components/product-rating"
import Image from "next/image"
import { LoadingSpinner } from "@/components/ui/loading"
import { getBestProductImage, getAllProductImages } from "@/lib/utils"
import { toast } from "sonner"
import { generateProductStructuredData, generateProductMetaTags, generateBreadcrumbStructuredData, generateProductSlug } from "@/lib/seo"

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image_url: string
  images: Array<{
    id: number
    image: string
    image_url: string
    alt_text: string
    order: number
    is_primary: boolean
    created_at: string
  }>
  category: {
    id: number
    name: string
    slug: string
  }
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  // Debug product images when product changes
  useEffect(() => {
    if (product) {
      console.log("Product loaded:", product)
      console.log("Product images:", product.images)
      console.log("All product images for display:", getAllProductImages(product))
      console.log("Selected image index:", selectedImageIndex)
    }
  }, [product, selectedImageIndex])

  // Image navigation functions
  const nextImage = () => {
    if (product) {
      const images = getAllProductImages(product)
      setSelectedImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (product) {
      const images = getAllProductImages(product)
      setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'ArrowRight') nextImage()
  }

  const fetchProduct = async () => {
    try {
      console.log("Fetching product with ID:", params.id)
      const productData = await productsAPI.getById(params.id as string)
      console.log("Product data received:", productData)
      console.log("Product images:", productData.images)
      console.log("Number of images:", productData.images?.length || 0)
      setProduct(productData)
    } catch (error) {
      console.error("Error fetching product:", error)
      console.log("Error details:", error)
      console.log("Falling back to mock product")
      const mockProduct = getMockProduct(Number(params.id))
      setProduct(mockProduct)
    } finally {
      setLoading(false)
    }
  }

  const getMockProduct = (id: number): Product => {
    const mockProducts: Record<number, Product> = {
      1: {
        id: 1,
        name: "Premium Wireless Headphones",
        description:
          "Experience superior sound quality with these premium wireless headphones. Featuring advanced noise cancellation technology, comfortable over-ear design, and up to 30 hours of battery life. Perfect for music lovers, professionals, and anyone who values high-quality audio.",
        price: 199.99,
        image_url: "/wireless-headphones.png",
        images: [
          {
            id: 1,
            image: "/wireless-headphones.png",
            image_url: "/wireless-headphones.png",
            alt_text: "Premium Wireless Headphones",
            order: 0,
            is_primary: true,
            created_at: "2024-01-01T00:00:00Z"
          }
        ],
        category: {
          id: 1,
          name: "Electronics",
          slug: "electronics"
        },
        stock: 10,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      2: {
        id: 2,
        name: "Smart Fitness Watch",
        description:
          "Track your fitness goals and stay connected with this advanced smartwatch. Monitor heart rate, steps, sleep patterns, and more. Water-resistant design perfect for workouts and daily wear.",
        price: 299.99,
        image_url: "/fitness-smartwatch.png",
        images: [
          {
            id: 2,
            image: "/fitness-smartwatch.png",
            image_url: "/fitness-smartwatch.png",
            alt_text: "Smart Fitness Watch",
            order: 0,
            is_primary: true,
            created_at: "2024-01-01T00:00:00Z"
          }
        ],
        category: {
          id: 1,
          name: "Electronics",
          slug: "electronics"
        },
        stock: 10,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      3: {
        id: 3,
        name: "Laptop Backpack",
        description:
          "Durable and stylish backpack designed for laptops up to 15.6 inches. Multiple compartments for organization, padded laptop sleeve, and comfortable shoulder straps make it perfect for work, school, or travel.",
        price: 79.99,
        image_url: "/laptop-backpack.png",
        images: [
          {
            id: 3,
            image: "/laptop-backpack.png",
            image_url: "/laptop-backpack.png",
            alt_text: "Laptop Backpack",
            order: 0,
            is_primary: true,
            created_at: "2024-01-01T00:00:00Z"
          }
        ],
        category: {
          id: 2,
          name: "Accessories",
          slug: "accessories"
        },
        stock: 10,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
      4: {
        id: 4,
        name: "Bluetooth Speaker",
        description:
          "Portable Bluetooth speaker with exceptional sound quality. Compact design with powerful bass, long battery life, and water-resistant construction. Perfect for outdoor adventures or home entertainment.",
        price: 149.99,
        image_url: "/bluetooth-speaker.png",
        images: [
          {
            id: 4,
            image: "/bluetooth-speaker.png",
            image_url: "/bluetooth-speaker.png",
            alt_text: "Bluetooth Speaker",
            order: 0,
            is_primary: true,
            created_at: "2024-01-01T00:00:00Z"
          }
        ],
        category: {
          id: 1,
          name: "Electronics",
          slug: "electronics"
        },
        stock: 10,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    }

    return (
      mockProducts[id] || {
        id,
        name: "Product Not Found",
        description: "This product could not be found.",
        price: 0,
        image_url: "/placeholder.svg?height=400&width=400",
        images: [
          {
            id: 0,
            image: "/placeholder.svg",
            image_url: "/placeholder.svg",
            alt_text: "Product Not Found",
            order: 0,
            is_primary: true,
            created_at: "2024-01-01T00:00:00Z"
          }
        ],
        category: {
          id: 0,
          name: "Unknown",
          slug: "unknown"
        },
        stock: 0,
        is_active: false,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      }
    )
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: getBestProductImage(product),
        }, (productName) => {
          if (i === quantity - 1) { // Only show toast on the last iteration
            toast.success("Added to Cart!", {
              description: `${quantity} x ${productName} has been added to your cart.`,
              duration: 3000,
            })
          }
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading product..." />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => router.push("/products")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>
    )
  }

  // Generate SEO data
  const productSlug = product ? generateProductSlug(product.name) : ''
  const metaTags = product ? generateProductMetaTags(product) : null
  const structuredData = product ? generateProductStructuredData(product) : null
  const breadcrumbData = product ? generateBreadcrumbStructuredData(product) : null

  return (
    <>
      {/* SEO Meta Tags */}
      {metaTags && (
        <Head>
          <title>{metaTags.title}</title>
          <meta name="description" content={metaTags.description} />
          <meta property="og:title" content={metaTags.openGraph.title} />
          <meta property="og:description" content={metaTags.openGraph.description} />
          <meta property="og:image" content={metaTags.openGraph.images[0].url} />
          <meta property="og:type" content={metaTags.openGraph.type} />
          <meta property="og:site_name" content={metaTags.openGraph.siteName} />
          <meta name="twitter:card" content={metaTags.twitter.card} />
          <meta name="twitter:title" content={metaTags.twitter.title} />
          <meta name="twitter:description" content={metaTags.twitter.description} />
          <meta name="twitter:image" content={metaTags.twitter.images[0]} />
        </Head>
      )}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}

      {/* Breadcrumb Structured Data */}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData)
          }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-8 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="max-w-6xl mx-auto" onKeyDown={handleKeyDown} tabIndex={0}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-xl bg-white shadow-lg relative group">
                <Image 
                  src={getAllProductImages(product)[selectedImageIndex] || getBestProductImage(product)} 
                  alt={product.name} 
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                
                {/* Arrow Navigation */}
                {getAllProductImages(product).length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {selectedImageIndex + 1} / {getAllProductImages(product).length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Image Gallery */}
              {getAllProductImages(product).length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {getAllProductImages(product).map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImageIndex === index 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image 
                        src={imageUrl} 
                        alt={`${product.name} - Image ${index + 1}`} 
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <Badge variant="outline" className="mb-4 border-gray-200">
              {product.category.name}
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground ml-2">(4.0 out of 5)</span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-blue-600 mb-6">{Number(product.price).toLocaleString()} DZD</div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">In Stock ({product.stock} available)</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <Separator />

          {/* Add to Cart */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={product.stock === 0}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-400"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock === 0 ? "Out of Stock" : `Add to Cart - ${(Number(product.price) * quantity).toLocaleString()} DZD`}
              </Button>
            </div>
          </div>
            </div>
          </div>
        </div>
        
        {/* Product Rating Section */}
        <div className="mt-12">
          <ProductRating productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
    </>
  )
}
