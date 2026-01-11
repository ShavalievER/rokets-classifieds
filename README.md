# Rokets Classifieds Platform

A high-performance classifieds marketplace built with Next.js 15, React 19, and TypeScript. This platform enables users to buy and sell items with integrated delivery tracking through Rokets Delivery.

## 🌟 Features

- **Two-Level Category Structure**: Organized product categories with subcategories
- **Seller Information**: Detailed seller profiles with ratings, location, and contact details
- **Rokets Delivery Integration**: Real-time delivery tracking with live map visualization
- **Order Management**: Complete order history with status tracking
- **User Accounts**: Profile settings, delivery addresses, and payment methods
- **Advanced Filtering**: Search by category, price, keywords, and seller location
- **Pagination**: Efficient browsing with 24 items per page
- **Demo Mode**: Works out of the box with mock data (no external APIs required)

## 🚀 Live Demo

Visit the live demo at: [https://rokets.delivery/demo](https://rokets.delivery/demo)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.6 (App Router)
- **React**: 19.0
- **TypeScript**: 5.8
- **Styling**: Tailwind CSS 4.0
- **Package Manager**: pnpm
- **Maps**: Leaflet (OpenStreetMap)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd commerce
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app runs in **demo mode** by default with mock product data, sellers, and orders.

## 🏗️ Project Structure

```
commerce/
├── app/                    # Next.js App Router pages
│   ├── account/           # User account pages
│   ├── orders/            # Order tracking pages
│   ├── product/           # Product detail pages
│   ├── search/            # Category and search pages
│   └── checkout/          # Checkout confirmation
├── components/            # React components
│   ├── orders/           # Order tracking components
│   ├── rockets/          # Delivery widget
│   ├── p2p/              # Seller and messaging components
│   └── layout/           # Layout components
├── lib/
│   ├── demo/             # Mock data (products, sellers, orders)
│   └── shopify/          # Shopify integration (optional)
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

The project works in demo mode without any environment variables. For production with Shopify integration, see [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md).

Optional variables:
- `SITE_NAME`: Site name (default: "Rokets")
- `COMPANY_NAME`: Company name for footer

## 📱 Features Overview

### Categories & Products
- 8 main categories with multiple subcategories
- 1 product per subcategory (auto-generated)
- Product cards with images, prices, and delivery costs
- Detailed product pages with seller information

### Delivery Tracking
- Real-time courier location on map
- Route visualization with waypoints
- Estimated delivery times
- Order status timeline

### User Features
- Account management
- Delivery address management
- Payment method management
- Order history
- Active order tracking

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `commerce` (if repo root is parent)
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
4. Add environment variables if needed
5. Deploy!

### Deploy to Custom Domain

To deploy to `https://rokets.delivery/demo`:

1. In Vercel project settings, go to **Domains**
2. Add `rokets.delivery` as a domain
3. Configure path prefix `/demo` in Vercel settings or use rewrites in `next.config.ts`

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm export-listings` - Export all listings to CSV

## 🤝 Contributing

This is a demo project. For contributions, please fork the repository and submit pull requests.

## 📄 License

See [LICENSE](./license.md) for details.

## 🙏 Acknowledgments

- Built on [Next.js Commerce](https://github.com/vercel/commerce) template
- Uses [Leaflet](https://leafletjs.com/) for maps
- Icons from [Heroicons](https://heroicons.com/)
