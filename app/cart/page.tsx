"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [isClearing, setIsClearing] = useState(false)
  const { t } = useTranslation()

  const handleClearCart = async () => {
    setIsClearing(true)
    // Add a small delay for better UX
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
    }, 300)
  }

  const subtotal = getTotalPrice()
  // Shipping will be calculated at checkout based on selected state and delivery type
  const shipping = 0 // Will be calculated at checkout
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t("cart.empty")}</h1>
          <p className="text-muted-foreground mb-8">
            {t("cart.emptyDesc")}
          </p>
          <Link href="/products">
            <Button size="lg">
              {t("cart.startShopping")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t("cart.title")}</h1>
          <div className="text-muted-foreground">
            {getTotalItems()} {getTotalItems() !== 1 ? t("cart.items") : t("cart.item")}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("cart.itemsInCart")}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  disabled={isClearing}
                  className="text-destructive hover:text-destructive"
                >
                  {isClearing ? t("cart.clearing") : t("cart.clearAll")}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}`}>
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-balance truncate">{item.name}</h3>
                        <p className="text-muted-foreground">{Number(item.price).toLocaleString()} {t("cart.dzdEach")}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-0">
                        <p className="font-semibold">{(Number(item.price) * item.quantity).toLocaleString()} {t("cart.dzd")}</p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {index < items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <div className="flex justify-between items-center">
              <Link href="/products">
                <Button variant="outline">{t("cart.continueShopping")}</Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("cart.orderSummary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t("cart.subtotal")} ({getTotalItems()} {getTotalItems() !== 1 ? t("cart.items") : t("cart.item")})</span>
                  <span>{Number(subtotal).toLocaleString()} {t("cart.dzd")}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t("cart.shipping")}</span>
                  <span className="text-muted-foreground">{t("cart.calculatedAtCheckout")}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>{t("cart.subtotal")}</span>
                  <span>{Number(subtotal).toLocaleString()} {t("cart.dzd")}</span>
                </div>

                <Link href="/checkout" className="block">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    {t("cart.proceedToCheckout")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{t("cart.secureCheckout")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>{t("cart.fastDelivery")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>{t("cart.returnPolicy")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{t("cart.securePayment")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
