"use client"

import { useState, useEffect } from "react"
import { cartStore } from "@/lib/cart-store"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export function useCart() {
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const unsubscribe = cartStore.subscribe(() => {
      forceUpdate({})
    })
    return unsubscribe
  }, [])

  return {
    items: cartStore.getItems(),
    addToCart: (product: Omit<CartItem, "quantity">, onSuccess?: (productName: string) => void) => 
      cartStore.addToCart(product, onSuccess),
    removeFromCart: cartStore.removeFromCart.bind(cartStore),
    updateQuantity: cartStore.updateQuantity.bind(cartStore),
    clearCart: cartStore.clearCart.bind(cartStore),
    getTotalItems: cartStore.getTotalItems.bind(cartStore),
    getTotalPrice: cartStore.getTotalPrice.bind(cartStore),
  }
}
