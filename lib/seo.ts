// SEO utilities for product pages

export interface ProductSEOData {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: {
    name: string
    slug: string
  }
  stock: number
  created_at: string
}

// Generate friendly URL slug from product name
export function generateProductSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Generate structured data (JSON-LD) for a product
export function generateProductStructuredData(product: ProductSEOData) {
  const availability = product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image_url,
    "category": product.category.name,
    "brand": {
      "@type": "Brand",
      "name": "Marketo"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "DZD",
      "availability": availability,
      "seller": {
        "@type": "Organization",
        "name": "Marketo"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.0",
      "reviewCount": "1"
    }
  }
}

// Generate meta tags for product pages
export function generateProductMetaTags(product: ProductSEOData) {
  const title = `${product.name} - Marketo`
  const description = product.description.length > 160 
    ? product.description.substring(0, 157) + '...'
    : product.description
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image_url,
          width: 800,
          height: 600,
          alt: product.name,
        }
      ],
      type: 'website',
      siteName: 'Marketo'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image_url]
    }
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(product: ProductSEOData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://marketo-frontend.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://marketo-frontend.vercel.app/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category.name,
        "item": `https://marketo-frontend.vercel.app/products?category=${product.category.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": `https://marketo-frontend.vercel.app/products/${product.id}/${generateProductSlug(product.name)}`
      }
    ]
  }
}
