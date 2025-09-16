"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { Loader2, Package, User, Mail } from "lucide-react"
import { ordersAPI } from "@/lib/api"
import OrderDetails from "@/components/order-details"

interface Order {
  id: number
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
  user: {
    first_name: string
    last_name: string
    email: string
  }
}

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

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchOrders()
    }
  }, [user, authLoading, router])

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getMine()
      console.log('Orders API response:', response) // Debug log
      
      // Handle case where response might not be an array
      if (Array.isArray(response)) {
        setOrders(response as any)
      } else if (response && Array.isArray((response as any).results)) {
        // Handle paginated response
        setOrders((response as any).results as any)
      } else if (response && Array.isArray((response as any).data)) {
        // Handle wrapped response
        setOrders((response as any).data as any)
      } else {
        console.warn('Unexpected orders response format:', response)
        setOrders([])
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Paid":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {user.first_name} {user.last_name}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order History
            </CardTitle>
            <CardDescription>View your recent orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders found</p>
                <Button className="mt-4" onClick={() => router.push("/products")}>
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div key={order.id}>
                    <div className="flex items-center justify-between py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">Order #{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.created_at)} • {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.delivery_state_display} • {order.payment_method_display}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{Number(order.total_price).toFixed(2)} DZD</p>
                        <OrderDetails order={order} />
                      </div>
                    </div>
                    {index < orders.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
