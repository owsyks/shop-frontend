"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { Printer, Shirt, CreditCard, CheckCircle, Star, Users, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration errors by not rendering until component is mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const services = [
    {
      id: 1,
      icon: CreditCard,
      title: t("services.businessCards.title"),
      description: t("services.businessCards.description"),
      features: [
        t("services.businessCards.features.premium"),
        t("services.businessCards.features.design"),
        t("services.businessCards.features.fast"),
        t("services.businessCards.features.quality")
      ],
      price: t("services.businessCards.price"),
      shortDesc: t("services.businessCards.shortDesc")
    },
    {
      id: 2,
      icon: Shirt,
      title: t("services.customTshirts.title"),
      description: t("services.customTshirts.description"),
      features: [
        t("services.customTshirts.features.custom"),
        t("services.customTshirts.features.quality"),
        t("services.customTshirts.features.bulk"),
        t("services.customTshirts.features.design")
      ],
      price: t("services.customTshirts.price"),
      shortDesc: t("services.customTshirts.shortDesc")
    },
    {
      id: 3,
      icon: Printer,
      title: t("services.customPrinting.title"),
      description: t("services.customPrinting.description"),
      features: [
        t("services.customPrinting.features.variety"),
        t("services.customPrinting.features.quality"),
        t("services.customPrinting.features.fast"),
        t("services.customPrinting.features.custom")
      ],
      price: t("services.customPrinting.price"),
      shortDesc: t("services.customPrinting.shortDesc")
    }
  ]

  const whyChooseUs = [
    {
      icon: Award,
      title: t("services.whyChooseUs.quality.title"),
      description: t("services.whyChooseUs.quality.description")
    },
    {
      icon: Clock,
      title: t("services.whyChooseUs.speed.title"),
      description: t("services.whyChooseUs.speed.description")
    },
    {
      icon: Users,
      title: t("services.whyChooseUs.experience.title"),
      description: t("services.whyChooseUs.experience.description")
    },
    {
      icon: Star,
      title: t("services.whyChooseUs.satisfaction.title"),
      description: t("services.whyChooseUs.satisfaction.description")
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("services.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t("services.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">
                {t("services.hero.cta")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/products">
                {t("services.hero.viewProducts")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("services.sectionTitle")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("services.sectionSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card key={service.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {t("services.featuresTitle")}
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        {service.price}
                      </Badge>
                    </div>

                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href="/contact">
                        {t("services.contactUs")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("services.whyChooseUs.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("services.whyChooseUs.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("services.cta.title")}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("services.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">
                {t("services.cta.button")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/products">
                {t("services.cta.viewProducts")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
