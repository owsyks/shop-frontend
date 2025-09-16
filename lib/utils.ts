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