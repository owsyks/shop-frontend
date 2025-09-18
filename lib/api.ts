import { config } from "./config"

const API_BASE_URL = config.API_BASE_URL

// Utility function to get the best image for a product
export const getProductImage = (product: Product): string => {
  // First try to get primary image
  const primaryImage = product.images?.find(img => img.is_primary)
  if (primaryImage?.image_url) {
    return primaryImage.image_url
  }
  
  // Then try to get first image
  const firstImage = product.images?.[0]?.image_url
  if (firstImage) {
    return firstImage
  }
  
  // Fallback to single image_url
  return product.image_url || '/placeholder.svg'
}

// Utility function to get all images for a product
export const getProductImages = (product: Product): ProductImage[] => {
  return product.images || []
}

// TypeScript interfaces for API responses
export interface User {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  full_name: string
  phone_number?: string
  address?: string
}

export interface AuthResponse {
  user: User
  tokens: {
    access: string
    refresh: string
  }
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface ProductImage {
  id: number
  image: string
  image_url: string
  alt_text: string
  order: number
  is_primary: boolean
  created_at: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image_url: string
  images: ProductImage[]
  category: Category
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}

export interface OrderItem {
  id: number
  product: Product
  quantity: number
  price: number
  total_price: number
}

export interface Order {
  id: number
  user: number
  total_price: number
  status: string
  created_at: string
  updated_at: string
  items: OrderItem[]
  can_cancel: boolean
  delivery_address: string
  delivery_state: string
  delivery_state_display: string
  phone_number: string
  payment_method: string
  payment_method_display: string
}

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token")
  }
  return null
}

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    })

    if (response.status === 401) {
      // Token expired, redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        window.location.href = "/login"
      }
    }

    return response
  } catch (error) {
    console.error('API request failed:', error)
    throw new Error('Network error occurred')
  }
}

// Auth API functions
export const authAPI = {
  register: async (userData: {
    username: string
    email: string
    password: string
    password_confirm: string
    first_name: string
    last_name: string
    phone_number?: string
    address?: string
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.detail || errorData.message || "Registration failed"
      throw new Error(errorMessage)
    }

    const data = await response.json()

    // Backend returns tokens nested in 'tokens' object
    if (data.tokens && data.tokens.access) {
      localStorage.setItem("access_token", data.tokens.access)
      if (data.tokens.refresh) {
        localStorage.setItem("refresh_token", data.tokens.refresh)
      }
    }

    return data
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refresh_token")
    if (!refreshToken) {
      throw new Error("No refresh token available")
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      throw new Error("Token refresh failed")
    }

    const data = await response.json()
    localStorage.setItem("access_token", data.access)
    return data.access
  },

  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData.detail || errorData.message || "Login failed"
      throw new Error(errorMessage)
    }

    const data = await response.json()

    // Backend returns tokens nested in 'tokens' object
    if (data.tokens && data.tokens.access) {
      localStorage.setItem("access_token", data.tokens.access)
      if (data.tokens.refresh) {
        localStorage.setItem("refresh_token", data.tokens.refresh)
      }
    }

    return data
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refresh_token")
    const response = await makeAuthenticatedRequest("/api/auth/logout/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (response.ok) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
    }

    return response.ok
  },

  getProfile: async (): Promise<User> => {
    const response = await makeAuthenticatedRequest("/api/auth/profile/")
    if (!response.ok) {
      throw new Error("Failed to fetch profile")
    }
    return response.json()
  },

  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await makeAuthenticatedRequest("/api/auth/profile/", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
    if (!response.ok) {
      throw new Error("Failed to update profile")
    }
    return response.json()
  },
}

// Products API functions
export const productsAPI = {
  getAll: async (params?: {
    search?: string
    category?: string
    ordering?: string
    page?: number
    page_size?: number
  }): Promise<ProductListResponse> => {
    const searchParams = new URLSearchParams()
    
    if (params?.search) searchParams.append('search', params.search)
    if (params?.category) searchParams.append('category', params.category)
    if (params?.ordering) searchParams.append('ordering', params.ordering)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.page_size) searchParams.append('page_size', params.page_size.toString())
    
    const queryString = searchParams.toString()
    const url = queryString ? `/api/products/?${queryString}` : '/api/products/'
    
    console.log('API Request URL:', `${API_BASE_URL}${url}`) // Debug log
    
    const response = await fetch(`${API_BASE_URL}${url}`)
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText)
      throw new Error('Failed to fetch products')
    }
    
    return response.json()
  },

  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}/`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch product')
    }
    
    return response.json()
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/api/products/categories/`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    
    const data = await response.json()
    
    // Handle paginated response from backend
    if (data.results && Array.isArray(data.results)) {
      return data.results
    }
    
    // Handle direct array response
    if (Array.isArray(data)) {
      return data
    }
    
    // Fallback to empty array
    return []
  },

  create: async (productData: any) => {
    const response = await makeAuthenticatedRequest("/api/products/create/", {
      method: "POST",
      body: JSON.stringify(productData),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to create product')
    }
    
    return response.json()
  },

  update: async (id: string, productData: any) => {
    const response = await makeAuthenticatedRequest(`/api/products/${id}/`, {
      method: "PUT",
      body: JSON.stringify(productData),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to update product')
    }
    
    return response.json()
  },

  delete: async (id: string) => {
    const response = await makeAuthenticatedRequest(`/api/products/${id}/`, {
      method: "DELETE",
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to delete product')
    }
    
    return response.ok
  },
}

// Orders API functions
export const ordersAPI = {
  create: async (orderData: {
    items: Array<{ product_id: number; quantity: number }>
    delivery_address: string
    delivery_state: string
    phone_number: string
    payment_method?: string
  }) => {
    const response = await makeAuthenticatedRequest("/api/orders/", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || errorData.message || 'Failed to create order')
    }
    
    return response.json()
  },

  getMine: async (): Promise<Order[]> => {
    const response = await makeAuthenticatedRequest("/api/orders/mine/")
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }
    
    return response.json()
  },

  getById: async (id: string): Promise<Order> => {
    const response = await makeAuthenticatedRequest(`/api/orders/${id}/`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch order')
    }
    
    return response.json()
  },

  cancel: async (id: string) => {
    const response = await makeAuthenticatedRequest(`/api/orders/${id}/cancel/`, {
      method: "POST",
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || errorData.message || 'Failed to cancel order')
    }
    
    return response.json()
  },
}

// Rating API functions
export const ratingsAPI = {
  // Get all ratings for a product
  getProductRatings: async (productId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/ratings/products/${productId}/ratings/`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch product ratings')
    }
    
    return response.json()
  },

  // Get rating summary for a product
  getProductRatingSummary: async (productId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/ratings/products/${productId}/rating-summary/`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch rating summary')
    }
    
    return response.json()
  },

  // Create a new rating
  create: async (ratingData: {
    product: number
    rating: number
    review?: string
  }) => {
    const response = await makeAuthenticatedRequest(`/api/ratings/products/${ratingData.product}/ratings/`, {
      method: "POST",
      body: JSON.stringify(ratingData),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || errorData.message || 'Failed to create rating')
    }
    
    return response.json()
  },

  // Update an existing rating
  update: async (ratingId: number, ratingData: {
    rating: number
    review?: string
  }) => {
    const response = await makeAuthenticatedRequest(`/api/ratings/ratings/${ratingId}/`, {
      method: "PUT",
      body: JSON.stringify(ratingData),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || errorData.message || 'Failed to update rating')
    }
    
    return response.json()
  },

  // Delete a rating
  delete: async (ratingId: number) => {
    const response = await makeAuthenticatedRequest(`/api/ratings/ratings/${ratingId}/`, {
      method: "DELETE",
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || errorData.message || 'Failed to delete rating')
    }
    
    return true
  },

  // Get products that user can rate (purchased but not yet rated)
  getPurchasedProducts: async () => {
    const response = await makeAuthenticatedRequest('/api/ratings/user/purchased-products/')
    
    if (!response.ok) {
      throw new Error('Failed to fetch purchased products')
    }
    
    return response.json()
  },
}

// Helper function to get product image URL
export const getProductImageUrl = (filename: string) => {
  return `${API_BASE_URL}/media/products/${filename}`
}
