'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductImage } from '@/lib/api'
import { getProductImageUrl } from '@/lib/api'

interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
  className?: string
}

export default function ProductImageGallery({ 
  images, 
  productName, 
  className = '' 
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // If no images, return null
  if (!images || images.length === 0) {
    return null
  }

  // Sort images by order
  const sortedImages = [...images].sort((a, b) => a.order - b.order)
  const currentImage = sortedImages[currentImageIndex]

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? sortedImages.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === sortedImages.length - 1 ? 0 : prev + 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Display */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={getProductImageUrl(currentImage.image_url)}
          alt={currentImage.alt_text || `${productName} - Image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Navigation Arrows */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {sortedImages.length > 1 && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-sm text-white">
            {currentImageIndex + 1} / {sortedImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {sortedImages.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                index === currentImageIndex
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={getProductImageUrl(image.image_url)}
                alt={image.alt_text || `${productName} - Thumbnail ${index + 1}`}
                className="h-16 w-16 object-cover"
              />
              
              {/* Primary Image Indicator */}
              {image.is_primary && (
                <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
