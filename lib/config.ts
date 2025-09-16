// Frontend configuration for Heroku backend
// Updated: Force Vercel redeploy with correct Heroku URLs
export const config = {
  // Heroku backend API URL
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://marketoo-c40becaacfb4.herokuapp.com",
  
  // App configuration
  APP_NAME: "Marketo E-commerce",
  APP_DESCRIPTION: "Modern e-commerce platform built with Next.js and Django",
  
  // Features
  FEATURES: {
    MULTILINGUAL: true,
    CART_PERSISTENCE: true,
    USER_RATINGS: true,
    ORDER_TRACKING: true,
  }
}
