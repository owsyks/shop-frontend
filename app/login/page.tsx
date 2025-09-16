"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/use-auth"
import { Eye, EyeOff } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading"
import { useFormValidation, validationRules } from "@/lib/form-validation"
import { useTranslation } from "react-i18next"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    getFieldError
  } = useFormValidation(
    { email: "", password: "" },
    {
      email: validationRules.email,
      password: validationRules.password
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      const success = await login(values.email, values.password)
      if (success) {
        router.push("/profile")
      } else {
        setError(t("auth.invalidCredentials"))
      }
    } catch (err) {
      setError(t("common.error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">{t("auth.welcomeBack")}</CardTitle>
            <CardDescription className="text-gray-600 text-base">{t("auth.signInDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.email")}
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={`pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg ${getFieldError("email") ? "border-red-500" : ""}`}
                  required
                  disabled={loading}
                />
                {getFieldError("email") && (
                  <p className="text-sm text-red-500">{getFieldError("email")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">{t("auth.password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.password")}
                    value={values.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                    className={`pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg ${getFieldError("password") ? "border-red-500" : ""}`}
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {getFieldError("password") && (
                  <p className="text-sm text-red-500">{getFieldError("password")}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl" 
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <LoadingSpinner size="sm" text={t("common.loading")} />
                ) : (
                  t("auth.signIn")
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("auth.noAccount")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
