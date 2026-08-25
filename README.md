# 📱 Anshu Mobile Shop — Full-Stack Business Website & Admin CMS

A premium, production-ready full-stack website and content management platform built for **Anshu Mobile Shop**. Designed to deliver an elegant, trustworthy local mobile store experience with full dynamic CMS control for the shop owner.

---

## 🚀 Key Features

* **⚡ High-Impact Dynamic Hero Section:** Live-managed banner with customizable headings, subheadings, badges, primary & secondary action buttons, and direct phone dialer.
* **🏷️ Full Offers & Deals Engine:** CRUD management for smartphone discounts, category filtering, percentage savings badges, validity timers, and pre-filled WhatsApp inquiry generation.
* **📸 Interactive Store Gallery:** Dynamic photo grid showcasing store interior, new device unboxings, accessories racks, and full-screen responsive Lightbox viewer.
* **🛡️ About & Trust Showcase:** Customizable store narrative, experience counters (7+ years, 10,000+ customers), and 6 trust pillars.
* **📍 Contact & Store Locator:** One-tap direct call (`tel:`), instant WhatsApp chat (`wa.me`), interactive Google Maps link, and contact inquiry form.
* **🔐 Secure Admin Control Panel:**
  * JWT Authentication & bcrypt hashed passwords
  * Rate-limited login against brute-force attacks
  * Dedicated CMS routes for Hero, Offers, Gallery, About, and Settings
  * Integrated Cloudinary image upload with automatic memory streaming
  * One-click cache refresh and store preview shortcuts

---

## 🛠️ Technology Stack

### Frontend (`/client`)
* **React 18** with **Vite**
* **Tailwind CSS v3** with custom typography, shadow elevations & metallic cobalt palette
* **Framer Motion** for subtle entrance animations and interactive modals
* **React Router v6** (Public storefront & protected admin routing)
* **Axios** with JWT request interceptor and error handling
* **Lucide React** modern icons

### Backend (`/server`)
* **Node.js** & **Express.js** (ES Modules)
* **MongoDB** & **Mongoose** (with automated database seeding and seamless in-memory fallback)
* **JWT (jsonwebtoken)** authentication & **bcryptjs**
* **Cloudinary** media storage with Multer memory processing
* **express-rate-limit** security protection

---

## 📂 Project Structure

```text
anshu-mobile-shop/
├── client/                     # Vite + React Frontend
│   ├── public/                 # Favicon, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/         # Navbar, Footer, Button, OfferCard, Lightbox, etc.
│   │   ├── context/            # AuthContext, ShopContext, ToastContext
│   │   ├── layouts/            # PublicLayout, AdminLayout
│   │   ├── pages/              # Home, About, Offers, Gallery, Contact, Admin Pages
│   │   ├── sections/           # HeroSection, OffersSection, WhyChooseUs, etc.
│   │   ├── services/           # api.js (Axios instance)
│   │   ├── styles/             # index.css (Tailwind & custom scrollbars)
│   │   ├── App.jsx             # Router configuration
│   │   └── main.jsx            # Application bootstrap
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js + Express Backend
│   ├── config/                 # db.js (MongoDB connect), cloudinary.js
│   ├── controllers/            # auth, hero, offers, gallery, about, settings, stats
│   ├── middleware/             # authMiddleware, uploadMiddleware, rateLimiter, error
│   ├── models/                 # Admin, Hero, Offer, Gallery, About, Settings
│   ├── routes/                 # Express API route declarations
│   ├── utils/                  # seedData.js (Initial store data populator)
│   ├── server.js               # Express application entry
│   └── package.json
│
└── README.md
```

---

## 🔑 Default Admin Credentials

When the server initializes for the first time, the database is automatically seeded with default store content and the primary administrator account:

* **Admin Portal URL:** `http://localhost:5173/admin/login`
* **Email:** `admin@anshumobile.com`
* **Password:** `Admin@12345`

*(Note: Admin password and details can be changed anytime from `/admin/settings`)*

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/anshu_mobile
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173

# Cloudinary (Optional - uploads work via base64 fallback if not provided)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Getting Started Locally

### 1. Start the Backend Server
```bash
cd server
npm install
npm run dev
```
*Server will start on `http://localhost:5000` and connect to MongoDB (or launch the in-memory instance automatically).*

### 2. Start the Frontend Client
```bash
cd client
npm install
npm run dev
```
*Frontend will launch on `http://localhost:5173`.*

---

## 📡 API Endpoints Reference

### Public Endpoints
* `GET /api/hero` — Fetch live hero banner content
* `GET /api/offers` — Fetch active promotional offers (supports `?category=` filter)
* `GET /api/offers/:id` — Fetch single offer by ID
* `GET /api/gallery` — Fetch store gallery images (supports `?category=` filter)
* `GET /api/about` — Fetch shop story, experience counters, and trust features
* `GET /api/settings` — Fetch shop contact details, opening hours & social links

### Protected Admin Endpoints (`Authorization: Bearer <token>`)
* `POST /api/admin/login` — Authenticate admin (rate-limited)
* `GET /api/admin/me` — Current admin session info
* `PUT /api/admin/change-password` — Update admin credentials
* `GET /api/admin/stats` — Dashboard metrics & overview
* `PUT /api/admin/hero` — Update hero section & image
* `POST /api/admin/offers` — Create new offer
* `PUT /api/admin/offers/:id` — Update offer
* `PATCH /api/admin/offers/:id/toggle` — Toggle active status
* `DELETE /api/admin/offers/:id` — Delete offer
* `POST /api/admin/gallery` — Upload gallery photo
* `DELETE /api/admin/gallery/:id` — Delete gallery photo
* `PUT /api/admin/about` — Update about narrative & trust points
* `PUT /api/admin/settings` — Update shop phone, address, WhatsApp & hours

---

## 📦 Production Build

To test and build the production bundle:
```bash
cd client
npm run build
```

The optimized static assets will be generated in `client/dist/`.

---

© 2026 Anshu Mobile Shop. Crafted for high-performance retail business.
