"use client"

import type React from "react"
import { productsAPI } from "@/lib/api"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { Star, Search, Filter, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LoadingSpinner } from "@/components/ui/loading"
import { getProductImageUrl } from "@/lib/utils"
import { toast } from "sonner"
import { generateProductSlug } from "@/lib/seo"

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Array<{id: number, name: string, slug: string}>>([])
  const [loading, setLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { addToCart } = useCart()
  const searchParams = useSearchParams()

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const categoriesData = await productsAPI.getCategories()
      setCategories(categoriesData)
      console.log("Fetched categories:", categoriesData)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setCategoriesLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    
    if (category) {
      setSelectedCategory(category)
    }
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [currentPage, selectedCategory, searchQuery])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params: any = {
        page: currentPage,
        page_size: 12, // Explicitly set page size
      }
      
      if (searchQuery.trim()) {
        params.search = searchQuery.trim()
      }
      
      if (selectedCategory !== "all") {
        // Use category ID instead of slug
        params.category = selectedCategory
        console.log("Filtering by category ID:", selectedCategory) // Debug log
      }
      
      console.log("API Request params:", params) // Debug log
      const data = await productsAPI.getAll(params)
      console.log("API Response:", data) // Debug log
      
      const results = (data as any).results || data
      const count = (data as any).count || results.length
      
      setProducts(results)
      setTotalPages(Math.ceil(count / 12))
      
      console.log("Products:", results.length, "Total:", count, "Pages:", Math.ceil(count / 12)) // Debug log
      console.log("First product category:", results[0]?.category) // Debug log
    } catch (error) {
      console.error("Error fetching products:", error)
      // Don't fall back to mock data, keep current state
      // setProducts(mockProducts)
      // setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    }, (productName) => {
      toast.success("Added to Cart!", {
        description: `${productName} has been added to your cart.`,
        duration: 3000,
      })
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page when searching
    fetchProducts()
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page when changing category
  }

  // Mock data for demo purposes
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 26800,
      image_url: "/wireless-headphones.png",
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
    {
      id: 2,
      name: "Smart Fitness Watch",
      description: "Track your fitness goals with this advanced smartwatch",
      price: 40200,
      image_url: "/fitness-smartwatch.png",
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
    {
      id: 3,
      name: "Laptop Backpack",
      description: "Durable backpack perfect for laptops and daily use",
      price: 10700,
      image_url: "/laptop-backpack.png",
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
    {
      id: 4,
      name: "Bluetooth Speaker",
      description: "Portable speaker with excellent sound quality",
      price: 20100,
      image_url: "/bluetooth-speaker.png",
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
    {
      id: 5,
      name: "Cotton T-Shirt",
      description: "Comfortable cotton t-shirt in various colors",
      price: 3350,
      image_url: "/cotton-t-shirt.jpg",
      category: {
        id: 3,
        name: "Fashion",
        slug: "fashion"
      },
      stock: 10,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      id: 6,
      name: "Running Shoes",
      description: "Lightweight running shoes for optimal performance",
      price: 17400,
      image_url: "/running-shoes-on-track.png",
      category: {
        id: 4,
        name: "Sports",
        slug: "sports"
      },
      stock: 0,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our amazing collection of high-quality products at great prices</p>
      </div>

      {/* Filters */}
      <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category, index) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  <div className="flex items-center justify-between w-full">
                    <span>{category.name}</span>
                    {index < categories.length - 1 && (
                      <span className="text-gray-400 ml-2">→</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" text="Loading products..." />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || selectedCategory !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "No products are available at the moment"
            }
          </p>
          {(searchQuery || selectedCategory !== "all") && (
            <Button 
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setCurrentPage(1)
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
                <CardContent className="p-6">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50 relative">
                    <Image
                      src={getProductImageUrl(product.image_url)}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(4.0)</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">{Number(product.price).toLocaleString()} DA</span>
                    <Badge variant="outline" className="text-xs border-gray-200">
                      {product.category.name}
                    </Badge>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/products/${product.id}/${generateProductSlug(product.name)}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2"
              >
                Previous
              </Button>
              
              {/* Page Numbers */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 ${
                        currentPage === pageNum 
                          ? "bg-blue-600 text-white" 
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  )
}
