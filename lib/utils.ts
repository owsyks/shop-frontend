import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to combine CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get the correct API base URL
export const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "https://marketoo-c40becaacfb4.herokuapp.com"
}

// Utility function to get product image URL
export const getProductImageUrl = (imageUrl: string | null | undefined): string => {
  if (!imageUrl) return "/placeholder.svg"
  
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  
  if (imageUrl.startsWith('/')) {
    return `${getApiBaseUrl()}${imageUrl}`
  }
  
  return `${getApiBaseUrl()}/media/products/${imageUrl}`
}

// Utility function to get the best image for a product (handles multiple images)
export const getBestProductImage = (product: any): string => {
  // First try to get primary image from images array
  if (product.images && product.images.length > 0) {
    const primaryImage = product.images.find((img: any) => img.is_primary)
    if (primaryImage?.image_url) {
      return getProductImageUrl(primaryImage.image_url)
    }
    
    // Then try first image
    const firstImage = product.images[0]?.image_url
    if (firstImage) {
      return getProductImageUrl(firstImage)
    }
  }
  
  // Fallback to single image_url
  return getProductImageUrl(product.image_url)
}

// Utility function to get all images for a product
export const getAllProductImages = (product: any): string[] => {
  if (product.images && product.images.length > 0) {
    return product.images.map((img: any) => getProductImageUrl(img.image_url))
  }
  
  // Fallback to single image
  const singleImage = getProductImageUrl(product.image_url)
  return singleImage !== "/placeholder.svg" ? [singleImage] : []
}