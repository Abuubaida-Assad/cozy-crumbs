# 🥐 Cozy Crumbs — Artisanal Bakery Web Application (Full-Stack MERN)

> **Cozy Crumbs** is a production-quality, responsive full-stack bakery web application inspired by high-end artisanal bakeries and KS Bakers. Built with modern architecture, warm chocolate/cream aesthetics, MongoDB database integration, JWT authentication, and a complete administrative catalog management dashboard.

---

## 🎨 Design System & Palette

The visual identity follows a warm, premium artisanal bakery aesthetic:

- **Primary Dark Brown (Cocoa)**: `#3A2923` (Headings, primary buttons, pill tags)
- **Deep Chocolate (Footer)**: `#24130D` / `#241006` (Footer background, dark accents)
- **Warm Brown**: `#6F5746` (Subtitles, borders, secondary elements)
- **Muted Caramel / Taupe**: `#9A8066` (Accents, labels)
- **Warm Amber Accent**: `#B36B39` (Highlight icons, CTAs, badge accents)
- **Cream / Soft Off-White**: `#F8F5EF` / `#FCFAF7` / `#FDFBF7` (Backgrounds, cards, panels)
- **Typography**: Google Fonts *Plus Jakarta Sans* & *DM Sans*

---

## 🚀 Tech Stack

### Frontend (`/client`)
- **React 18** with **Vite**
- **Tailwind CSS v3** with custom theme tokens & micro-animations
- **React Router v6** for client-side routing
- **Lucide React** for icons
- **Framer Motion** for smooth entrances, drawer transitions & modals
- **Canvas Confetti** for delightful celebration feedback
- **Axios** with JWT request/response interceptors

### Backend (`/server`)
- **Node.js** & **Express.js** (ES Modules)
- **MongoDB** with **Mongoose** ORM
- **In-Memory MongoDB Server fallback** (zero-config, works instantly without local MongoDB installation)
- **JWT (JSON Web Tokens)** for stateless authentication
- **Bcryptjs** for password hashing
- **CORS** & centralized error handling middleware

---

## 📂 Project Structure

```
COZY-CRUMBS/
├── package.json               # Root scripts
├── README.md                  # Complete documentation
│
├── client/                    # Frontend React Vite Application
│   ├── public/                # Static assets & icons
│   ├── src/
│   │   ├── assets/            # Static imagery
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx             # Responsive sticky navbar with scroll blur
│   │   │   ├── Footer.jsx             # Dark chocolate 3-column footer
│   │   │   ├── Hero.jsx               # EST. 2026 Hero with bakery visual
│   │   │   ├── StatsSection.jsx       # Overlapping 4-stat pill counter
│   │   │   ├── CollectionSection.jsx  # Handcrafted delights category grid
│   │   │   ├── FeaturedProducts.jsx   # Our Favorites product showcase
│   │   │   ├── ProductCard.jsx        # Bakery item card with hover zoom & dietary tags
│   │   │   ├── ProductModal.jsx       # Item details modal with nutrition & ingredients
│   │   │   ├── StoreModal.jsx         # "Pick a Store to Order" outlet selector
│   │   │   ├── CartDrawer.jsx         # Slide-over order bag with quantities & totals
│   │   │   ├── FloatingCartButton.jsx # Bottom-right floating bag button
│   │   │   ├── Testimonials.jsx       # 5-star customer review cards
│   │   │   ├── QualityStory.jsx       # In-house bakery craft narrative
│   │   │   ├── ImageUploader.jsx      # Reusable image input (URL, Presets, File)
│   │   │   ├── ConfirmDialog.jsx      # Accessible delete confirmation
│   │   │   ├── SkeletonLoader.jsx     # Loading skeletons & spinners
│   │   │   └── ProtectedRoute.jsx     # Admin auth route guard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Admin session & JWT token manager
│   │   │   ├── CartContext.jsx        # Bag items, store selection & drawer state
│   │   │   └── ToastContext.jsx       # Floating animated notification toasts
│   │   ├── layouts/
│   │   │   ├── RootLayout.jsx         # Customer site layout
│   │   │   └── AdminLayout.jsx        # Admin dashboard layout & sidebar
│   │   ├── pages/
│   │   │   ├── HomePage.jsx           # Landing page with full sections
│   │   │   ├── MenuPage.jsx           # Categorized catalog with dietary filters
│   │   │   ├── ProductDetailPage.jsx  # Dedicated product page with related items
│   │   │   ├── AboutPage.jsx          # Our Story, bakery values & timeline
│   │   │   ├── BlogPage.jsx           # Bakery journal & recipe guides
│   │   │   ├── BlogPostPage.jsx       # Full blog article reader
│   │   │   ├── CareersPage.jsx        # Job listings & application modal
│   │   │   ├── ContactPage.jsx        # Form submission & 5 Hyderabad outlets
│   │   │   ├── NotFoundPage.jsx       # 404 page
│   │   │   └── admin/
│   │   │       ├── AdminLoginPage.jsx     # Admin authentication portal
│   │   │       ├── AdminDashboardPage.jsx # Analytics, metrics & quick links
│   │   │       ├── AdminProductsPage.jsx  # Full Product CRUD & availability toggle
│   │   │       ├── AdminCategoriesPage.jsx# Category CRUD & product count checks
│   │   │       ├── AdminMessagesPage.jsx  # Contact submissions inbox
│   │   │       ├── AdminOrdersPage.jsx    # Store pickup orders overview
│   │   │       └── AdminSettingsPage.jsx  # Admin profile & connection status
│   │   ├── services/
│   │   │   ├── api.js                 # Axios instance with auth headers
│   │   │   ├── authService.js         # Login, profile & token helpers
│   │   │   ├── categoryService.js     # Category REST endpoints
│   │   │   ├── productService.js      # Product REST endpoints & filters
│   │   │   ├── contactService.js      # Contact form submission endpoints
│   │   │   └── storeService.js        # Outlets list endpoint
│   │   ├── App.jsx                    # Routing configuration
│   │   ├── index.css                  # Design system & Tailwind layer rules
│   │   └── main.jsx                   # Application bootstrap
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── server/                    # Express.js REST API & MongoDB Backend
    ├── src/
    │   ├── config/
    │   │   └── db.js                  # MongoDB connection with In-Memory fallback
    │   ├── controllers/
    │   │   ├── authController.js      # Register, Login, Me
    │   │   ├── categoryController.js  # Category CRUD with safety checks
    │   │   ├── productController.js   # Product CRUD, filters, availability toggle
    │   │   ├── contactController.js   # Contact form submission & retrieval
    │   │   └── storeController.js     # Bakery outlet locations
    │   ├── middleware/
    │   │   ├── authMiddleware.js      # JWT verification & requireAdmin guard
    │   │   └── errorMiddleware.js     # Centralized error handler
    │   ├── models/
    │   │   ├── User.js                # Admin & user model with bcrypt
    │   │   ├── Category.js            # Category schema with auto-slug
    │   │   ├── Product.js             # Bakery product schema with dietary flags
    │   │   ├── ContactMessage.js      # Inquiries schema with status
    │   │   └── Store.js               # Bakery retail outlet schema
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── categoryRoutes.js
    │   │   ├── productRoutes.js
    │   │   ├── contactRoutes.js
    │   │   └── storeRoutes.js
    │   ├── utils/
    │   │   ├── seedData.js            # 12 categories, 20+ realistic products, 5 stores
    │   │   └── seed.js                # Manual seed execution script
    │   └── server.js                  # Express application setup (Port 5050)
    ├── .env
    └── package.json
```

---

## ⚡ Quick Start & Installation

### 1. Install Dependencies

In the root directory, install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Start the Backend Server

```bash
cd server
npm run dev
```

*The server will start on `http://localhost:5050`. If MongoDB is running on port 27017, it connects to it; otherwise, it automatically boots the In-Memory MongoDB engine and auto-seeds the catalog.*

### 3. Start the Frontend Client

In a separate terminal window:

```bash
cd client
npm run dev
```

*Open your browser and navigate to `http://localhost:5174/` (or the assigned Vite port).*

---

## 🔑 Default Admin Credentials

- **Email**: `admin@cozycrumbs.com`
- **Password**: `ChangeThisPassword123!`
- **Access Route**: `http://localhost:5174/admin/login`

> **Note**: Passwords are saved with bcrypt hashing. When logged in as Admin, you can create, update, hide, or delete products and categories in real-time. Changes immediately reflect across the customer-facing website and menu.

---

## 🧁 Bakery Outlets Seeded

1. **Cozy Crumbs — Jubilee Hills** (Road No. 36)
2. **Cozy Crumbs — Banjara Hills** (Road No. 12)
3. **Cozy Crumbs — Madhapur** (Near Inorbit Mall, Hitec City)
4. **Cozy Crumbs — Gachibowli** (Financial District)
5. **Cozy Crumbs — Kukatpally** (KPHB Colony)

---

## 🛠️ API Routes Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/login` | Authenticate admin / user & return JWT | Public |
| `POST` | `/api/auth/register` | Register new account | Public |
| `GET` | `/api/auth/me` | Get authenticated profile | Private |
| `GET` | `/api/categories` | Get active menu categories with item counts | Public |
| `POST` | `/api/categories` | Create new category | Admin |
| `PUT` | `/api/categories/:id` | Update category details/order | Admin |
| `DELETE` | `/api/categories/:id` | Delete category (checks attached products) | Admin |
| `GET` | `/api/products` | Get products with search, category, veg/eggless filters | Public |
| `GET` | `/api/products/featured` | Get signature featured bakes | Public |
| `GET` | `/api/products/:id` | Get single product with related recommendations | Public |
| `POST` | `/api/products` | Add new product | Admin |
| `PUT` | `/api/products/:id` | Update product details | Admin |
| `DELETE` | `/api/products/:id` | Delete product from catalog | Admin |
| `PATCH` | `/api/products/:id/toggle-availability` | Quick toggle available/hidden | Admin |
| `PATCH` | `/api/products/:id/toggle-featured` | Quick toggle featured on homepage | Admin |
| `POST` | `/api/contact` | Submit contact / celebration cake inquiry | Public |
| `GET` | `/api/contact` | View all customer inquiries | Admin |
| `GET` | `/api/stores` | Get all bakery outlet locations | Public |

---

## 🏗️ Production Build

To build the client for production:

```bash
cd client
npm run build
```

This compiles optimized bundles into `client/dist/`.
