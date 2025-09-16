import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from "@/components/i18n-provider"
import { ClientOnly } from "@/components/client-only"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import "./globals.css"

export const metadata: Metadata = {
  title: "Marketo - Your Online Shopping Destination",
  description: "Modern e-commerce marketplace with quality products at great prices",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Marketo",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="Marketo" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Marketo" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/marketo-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/marketo-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/marketo-logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col`}>
        <ErrorBoundary>
          <I18nProvider>
            <ClientOnly fallback={<div className="h-16 bg-background" />}>
              <Suspense fallback={<div className="h-16 bg-background" />}>
                <Header />
              </Suspense>
            </ClientOnly>
            <main className="flex-1">
              <ErrorBoundary>
                <Suspense fallback={<div className="min-h-screen bg-background" />}>{children}</Suspense>
              </ErrorBoundary>
            </main>
            <ClientOnly fallback={<div className="h-32 bg-background" />}>
              <Suspense fallback={<div className="h-32 bg-background" />}>
                <Footer />
              </Suspense>
            </ClientOnly>
            <ClientOnly>
              <Suspense fallback={null}>
                <Toaster />
              </Suspense>
            </ClientOnly>
          </I18nProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
