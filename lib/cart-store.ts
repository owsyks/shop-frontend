interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

class CartStore {
  private items: CartItem[] = []
  private listeners: (() => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage()
    }
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem("cart")
      if (saved) {
        this.items = JSON.parse(saved)
      }
    } catch (error) {
      console.error("Error loading cart:", error)
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(this.items))
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  getItems() {
    return this.items
  }

  addToCart(product: Omit<CartItem, "quantity">, onSuccess?: (productName: string) => void) {
    const existingItem = this.items.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({ ...product, quantity: 1 })
    }
    this.saveToStorage()
    this.notify()
    
    // Call success callback if provided
    if (onSuccess) {
      onSuccess(product.name)
    }
  }

  removeFromCart(id: number) {
    this.items = this.items.filter((item) => item.id !== id)
    this.saveToStorage()
    this.notify()
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(id)
      return
    }
    const item = this.items.find((item) => item.id === id)
    if (item) {
      item.quantity = quantity
      this.saveToStorage()
      this.notify()
    }
  }

  clearCart() {
    this.items = []
    this.saveToStorage()
    this.notify()
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }
}

export const cartStore = new CartStore()
