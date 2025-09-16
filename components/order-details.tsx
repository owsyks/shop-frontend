"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, MapPin, Phone, CreditCard, Calendar, Truck, User } from "lucide-react"
import { getProductImageUrl } from "@/lib/utils"

interface OrderItem {
  id: number
  product: {
    id: number
    name: string
    image_url: string
    price: number
  }
  quantity: number
  price: number
}

interface Order {
  id: number
  status: string
  total_price: number
  created_at: string
  updated_at: string
  delivery_address: string
  delivery_state: string
  delivery_state_display: string
  phone_number: string
  payment_method: string
  payment_method_display: string
  items: OrderItem[]
  user: {
    first_name: string
    last_name: string
    email: string
  }
}

interface OrderDetailsProps {
  order: Order
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const [open, setOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'paid':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mt-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-300 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Order #{order.id} Details</span>
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{formatDate(order.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Items:</span>
                  <span className="font-medium">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Payment:</span>
                  <span className="font-medium">{order.payment_method_display}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {Number(order.total_price).toLocaleString()} DZD
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900">
                    {order.user.first_name} {order.user.last_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{order.user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Delivery Address</label>
                  <p className="text-gray-900">{order.delivery_address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">State (Wilaya)</label>
                  <p className="text-gray-900">{order.delivery_state_display}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone Number</label>
                  <p className="text-gray-900 flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {order.phone_number}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={getProductImageUrl(item.product.image_url)}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { const target = e.target as HTMLImageElement; target.src = "/placeholder.svg"; }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-500">
                          {Number(item.product.price).toLocaleString()} DZD each
                        </p>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {(Number(item.product.price) * item.quantity).toLocaleString()} DZD
                        </p>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Total */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">
                  {Number(order.total_price).toLocaleString()} DZD
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
