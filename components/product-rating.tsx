"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageSquare, ThumbsUp } from "lucide-react"
import { ratingsAPI } from "@/lib/api"
import { useAuth } from "@/hooks/use-auth"

interface RatingSummary {
  average_rating: number
  total_ratings: number
  can_user_rate: boolean
  user_rating: number | null
}

interface Rating {
  id: number
  user_name: string
  user_full_name: string
  rating: number
  review: string
  created_at: string
}

interface ProductRatingProps {
  productId: number
  productName: string
}

export default function ProductRating({ productId, productName }: ProductRatingProps) {
  const { user } = useAuth()
  const [ratingSummary, setRatingSummary] = useState<RatingSummary | null>(null)
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [newReview, setNewReview] = useState("")

  useEffect(() => {
    fetchRatingData()
  }, [productId])

  const fetchRatingData = async () => {
    try {
      setLoading(true)
      const [summary, ratingsData] = await Promise.all([
        ratingsAPI.getProductRatingSummary(productId),
        ratingsAPI.getProductRatings(productId)
      ])
      setRatingSummary(summary)
      setRatings(ratingsData)
    } catch (error) {
      console.error("Error fetching rating data:", error)
      setError("Failed to load ratings")
    } finally {
      setLoading(false)
    }
  }

  const handleRatingSubmit = async () => {
    if (!user) {
      setError("Please log in to rate this product")
      return
    }

    if (newRating === 0) {
      setError("Please select a rating")
      return
    }

    try {
      setSubmitting(true)
      setError("")
      
      await ratingsAPI.create({
        product: productId,
        rating: newRating,
        review: newReview.trim() || undefined
      })

      // Refresh rating data
      await fetchRatingData()
      
      // Reset form
      setNewRating(0)
      setNewReview("")
      setShowRatingForm(false)
      
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

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span>Customer Reviews</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ratingSummary && (
            <>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {ratingSummary.average_rating.toFixed(1)}
                  </div>
                  {renderStars(Math.round(ratingSummary.average_rating))}
                  <div className="text-sm text-gray-500 mt-1">
                    Based on {ratingSummary.total_ratings} review{ratingSummary.total_ratings !== 1 ? 's' : ''}
                  </div>
                </div>
                
                {ratingSummary.can_user_rate && !ratingSummary.user_rating && (
                  <div className="flex-1">
                    <Button
                      onClick={() => setShowRatingForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Rate This Product
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      You purchased this product and can now rate it
                    </p>
                  </div>
                )}
                
                {ratingSummary.user_rating && (
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">
                      Your rating: {renderStars(ratingSummary.user_rating)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Thank you for your review!
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Rating Form */}
      {showRatingForm && (
        <Card>
          <CardHeader>
            <CardTitle>Rate {productName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating *
              </label>
              {renderStars(newRating, true, setNewRating)}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review (Optional)
              </label>
              <Textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={4}
                className="w-full"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleRatingSubmit}
                disabled={submitting || newRating === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {submitting ? "Submitting..." : "Submit Rating"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRatingForm(false)
                  setNewRating(0)
                  setNewReview("")
                  setError("")
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {ratings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Customer Reviews ({ratings.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-900">
                      {rating.user_full_name || rating.user_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(rating.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {renderStars(rating.rating)}
                </div>
                {rating.review && (
                  <p className="text-gray-700 mt-2">{rating.review}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
