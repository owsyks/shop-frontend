# Marketo E-commerce Frontend

A modern e-commerce frontend built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Multilingual Support**: English and Arabic language support
- **Shopping Cart**: Persistent cart with local storage
- **User Authentication**: Login, registration, and profile management
- **Product Management**: Browse, search, and filter products
- **Order Tracking**: View order history and status
- **Product Ratings**: Rate and review products
- **Real-time API**: Connected to Django REST API backend

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand
- **HTTP Client**: Fetch API
- **Icons**: Lucide React
- **Internationalization**: react-i18next

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/owsyks/shop-frontend.git
   cd shop-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_URL=https://marketoo-c40becaacfb4.herokuapp.com
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Connect your GitHub repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure environment variables**:
   - Add `NEXT_PUBLIC_API_URL=https://marketoo-c40becaacfb4.herokuapp.com`
   - Add any other required environment variables

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set environment variables**:
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   # Enter: https://marketoo-c40becaacfb4.herokuapp.com
   ```

5. **Redeploy**:
   ```bash
   vercel --prod
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://marketoo-c40becaacfb4.herokuapp.com` |

### API Endpoints

The frontend connects to these backend endpoints:

- **Products**: `/api/products/`
- **Categories**: `/api/products/categories/`
- **Authentication**: `/api/auth/`
- **Orders**: `/api/orders/`
- **Ratings**: `/api/ratings/`

## 📱 Features Overview

### 🛍️ Shopping Experience
- Browse products by category
- Search products by name/description
- Add products to cart
- Persistent cart across sessions
- Checkout process

### 👤 User Management
- User registration and login
- Profile management
- Order history
- Product ratings and reviews

### 🌍 Internationalization
- English and Arabic support
- RTL layout for Arabic
- Language switcher

### 📊 Admin Features
- Admin panel access
- Product management
- Order tracking
- User management

## 🎨 UI Components

Built with shadcn/ui components:
- Cards, Buttons, Inputs
- Dialogs, Dropdowns, Selects
- Loading spinners, Badges
- Responsive layouts

## 🔗 Backend Integration

This frontend is designed to work with the Django REST API backend:
- **Backend Repository**: [shop-backend](https://github.com/owsyks/shop-backend.git)
- **Backend URL**: https://marketoo-c40becaacfb4.herokuapp.com
- **Admin Panel**: https://marketoo-c40becaacfb4.herokuapp.com/admin/

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, please open an issue on GitHub or contact the development team.
