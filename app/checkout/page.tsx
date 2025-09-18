"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { Loader2, Truck, Shield, ArrowLeft, Banknote } from "lucide-react"
import { ordersAPI } from "@/lib/api"
import { algeriaWilayas, deliveryOptions, type Wilaya, type Commune } from "@/lib/algeria-data"

interface CheckoutForm {
  fullName: string
  email: string
  phone: string
  deliveryAddress: string
  wilaya: string
  commune: string
  deliveryType: string
}

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | null>(null)
  const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null)

  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: user ? `${user.first_name} ${user.last_name}`.trim() : "",
    email: user?.email || "",
    phone: "",
    deliveryAddress: "",
    wilaya: "",
    commune: "",
    deliveryType: "home"
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (items.length === 0) {
      router.push("/cart")
      return
    }
  }, [user, items, router])

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const handleWilayaChange = (wilayaId: string) => {
    const wilaya = algeriaWilayas.find(w => w.id.toString() === wilayaId)
    setSelectedWilaya(wilaya || null)
    setSelectedCommune(null)
    setFormData(prev => ({ 
      ...prev, 
      wilaya: wilayaId,
      commune: ""
    }))
  }

  const handleCommuneChange = (communeId: string) => {
    if (!selectedWilaya) return
    const commune = selectedWilaya.communes.find(c => c.id.toString() === communeId)
    setSelectedCommune(commune || null)
    setFormData(prev => ({ ...prev, commune: communeId }))
  }

  const validateForm = () => {
    const required = ["fullName", "email", "phone", "deliveryAddress", "wilaya", "commune"]
    for (const field of required) {
      if (!formData[field as keyof CheckoutForm]) {
        setError(`Please fill in all required fields`)
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check if user is authenticated
    if (!user) {
      setError("Please log in to place an order.")
      router.push("/login")
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const orderData = {
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        delivery_address: formData.deliveryAddress,
        delivery_state: formData.wilaya,
        delivery_commune: formData.commune,
        delivery_type: formData.deliveryType,
        phone_number: formData.phone,
        payment_method: "Cash on Delivery",
      }

      console.log("Sending order data:", orderData) // Debug log

      const result = await ordersAPI.create(orderData)

      if (result) {
        setSuccess(true)
        clearCart()
        // Redirect to profile after a delay
        setTimeout(() => {
          router.push("/profile")
        }, 5000)
      } else {
        setError("Failed to place order. Please try again.")
      }
    } catch (err: any) {
      console.error("Order creation error:", err)
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getTotalPrice()
  const shipping = 700 // Fixed shipping cost of 700 DZD
  const total = subtotal + shipping

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-8">Your order has been placed. We will call you to confirm.</p>
          <Button onClick={() => router.push("/profile")}>View Order History</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
            <p className="text-xl text-gray-600">Complete your order and we'll deliver it to you</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Banknote className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Delivery Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wilaya">Wilaya (State) *</Label>
                      <Select value={formData.wilaya} onValueChange={handleWilayaChange}>
                        <SelectTrigger className="bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Select your wilaya" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg">
                          {algeriaWilayas.map((wilaya) => (
                            <SelectItem key={wilaya.id} value={wilaya.id.toString()}>
                              {wilaya.id.toString().padStart(2, '0')} - {wilaya.name} ({wilaya.arabicName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedWilaya && (
                      <div className="space-y-2">
                        <Label htmlFor="commune">Commune *</Label>
                        <Select value={formData.commune} onValueChange={handleCommuneChange}>
                          <SelectTrigger className="bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                            <SelectValue placeholder="Select your commune" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-300 shadow-lg">
                            {selectedWilaya.communes.map((commune) => (
                              <SelectItem key={commune.id} value={commune.id.toString()}>
                                {commune.name} ({commune.arabicName})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="deliveryType">Delivery Type *</Label>
                      <Select value={formData.deliveryType} onValueChange={(value) => handleInputChange("deliveryType", value)}>
                        <SelectTrigger className="bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Select delivery type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg">
                          {deliveryOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name} ({option.arabicName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                      <Input
                        id="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                        placeholder="Enter your complete delivery address"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    `Place Order - ${Number(total).toFixed(2)} DZD`
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">{(Number(item.price) * item.quantity).toFixed(2)} DZD</p>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{Number(subtotal).toFixed(2)} DZD</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{Number(shipping).toFixed(2)} DZD</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{Number(total).toFixed(2)} DZD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}