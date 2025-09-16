"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, ShoppingBag, ThumbsUp } from "lucide-react"
import { ratingsAPI } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { getProductImageUrl } from "@/lib/utils"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: {
    id: number
    name: string
    slug: string
  }
}

export default function RatingPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      fetchPurchasedProducts()
    }
  }, [user])

  const fetchPurchasedProducts = async () => {
    try {
      setLoading(true)
      const data = await ratingsAPI.getPurchasedProducts()
      setProducts(data)
    } catch (error: any) {
      setError(error.message || "Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-500" : ""}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Rate Your Products</h1>
          <p className="text-muted-foreground mb-8">
            Please log in to rate products you've purchased.
          </p>
          <Link href="/login">
            <Button size="lg">Log In</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Rate Your Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Rate Your Products</h1>
          <p className="text-red-600 mb-8">{error}</p>
          <Button onClick={fetchPurchasedProducts}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">No Products to Rate</h1>
          <p className="text-muted-foreground mb-8">
            You haven't purchased any products yet, or you've already rated all your purchases.
          </p>
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Rate Your Products</h1>
          <p className="text-muted-foreground">
            Share your experience with products you've purchased. Your reviews help other customers make informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductRatingCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ProductRatingCardProps {
  product: Product
}

function ProductRatingCard({ product }: ProductRatingCardProps) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    try {
      setSubmitting(true)
      setError("")
      
      await ratingsAPI.create({
        product: product.id,
        rating,
        review: review.trim() || undefined
      })

      setSuccess(true)
      
    } catch (error: any) {
      setError(error.message || "Failed to submit rating")
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-500" : ""}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    )
  }

  if (success) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Thank You!</h3>
          <p className="text-muted-foreground text-sm">
            Your rating has been submitted successfully.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Product Image */}
          <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={getProductImageUrl(product.image_url)}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { const target = e.target as HTMLImageElement; target.src = "/placeholder.svg"; }}
            />
          </div>

          {/* Product Info */}
          <div>
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{product.category.name}</p>
            <p className="text-lg font-bold text-blue-600">{Number(product.price).toLocaleString()} DZD</p>
          </div>

          {/* Rating Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating *
              </label>
              {renderStars(rating, true, setRating)}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review (Optional)
              </label>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience..."
                rows={3}
                className="w-full"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={submitting || rating === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
