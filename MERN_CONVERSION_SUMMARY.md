# GlassEase: PHP to MERN Stack Conversion Summary

All converted code is organized in two main folders:

## 📦 Folder Structure

### 1. `server/` - Backend (Node.js + Express + MongoDB)
Complete backend API server replacing all PHP functionality.

**Location:** `C:\xampp\htdocs\glassease\server\`

**Key Files:**
- `src/index.js` - Main server entry point
- `src/lib/db.js` - MongoDB connection (replaces config.php)
- `src/models/` - Database models (User, Order, Feedback)
- `src/routes/` - API routes (auth, orders, feedback, upload)
- `src/middleware/auth.js` - JWT authentication middleware
- `package.json` - Dependencies and scripts
- `.env` - Environment configuration (create this)

**API Endpoints:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (replaces login.php)
- `POST /api/orders` - Create booking (replaces submit_booking.php)
- `GET /api/orders` - List orders (admin/vendor - replaces dashboard.php)
- `PATCH /api/orders/:id/status` - Update status (replaces update_status.php)
- `GET /api/orders/track?name=NAME` - Track orders (replaces track.php)
- `POST /api/feedback` - Submit feedback (replaces feedback.php)
- `POST /api/upload` - Upload images (new file upload handling)

### 2. `client/` - Frontend (React + Vite)
Complete React application replacing all HTML/PHP frontend.

**Location:** `C:\xampp\htdocs\glassease\client\`

**Key Files:**
- `src/main.jsx` - React entry point
- `src/App.jsx` - Main app with routing
- `src/pages/` - All page components:
  - `Home.jsx` - Home page (replaces index.html)
  - `Gallery.jsx` - Gallery page (replaces gallery.html)
  - `Book.jsx` - Booking form (replaces book.html)
  - `Cart.jsx` - Shopping cart (replaces cart.html)
  - `Track.jsx` - Order tracking (replaces track.php)
  - `Feedback.jsx` - Feedback form (replaces feedback.php)
  - `Login.jsx` - Login page (replaces login.php)
  - `Dashboard.jsx` - Admin dashboard (replaces dashboard.php)
- `vite.config.js` - Vite configuration with API proxy
- `package.json` - Dependencies and scripts
- `index.html` - HTML entry point

## 🔄 Conversion Mapping

| Old PHP/HTML File | New MERN Location |
|-------------------|-------------------|
| `config.php` | `server/src/lib/db.js` |
| `login.php` | `server/src/routes/auth.js` + `client/src/pages/Login.jsx` |
| `submit_booking.php` | `server/src/routes/orders.js` (POST) |
| `track.php` | `server/src/routes/orders.js` (GET track) + `client/src/pages/Track.jsx` |
| `dashboard.php` | `server/src/routes/orders.js` (GET) + `client/src/pages/Dashboard.jsx` |
| `update_status.php` | `server/src/routes/orders.js` (PATCH) |
| `feedback.php` | `server/src/routes/feedback.js` + `client/src/pages/Feedback.jsx` |
| `index.html` | `client/src/pages/Home.jsx` |
| `gallery.html` | `client/src/pages/Gallery.jsx` |
| `book.html` | `client/src/pages/Book.jsx` |
| `cart.html` | `client/src/pages/Cart.jsx` |

## ✅ What's Complete

✓ Backend API server with all routes
✓ MongoDB models and database connection
✓ JWT authentication system
✓ File upload handling
✓ React frontend with all pages
✓ Client-side routing (React Router)
✓ API integration (Axios)
✓ Admin dashboard with order management
✓ Order tracking functionality
✓ Feedback system

## 📋 To Run the Project

1. **Setup Server:**
   ```bash
   cd server
   npm install
   # Create .env file (see README.md)
   npm run dev
   ```

2. **Setup Client:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Access:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📁 All Converted Code Locations

**Backend:** `server/src/` (complete)
- Models: `server/src/models/`
- Routes: `server/src/routes/`
- Middleware: `server/src/middleware/`
- Database: `server/src/lib/db.js`
- Entry: `server/src/index.js`

**Frontend:** `client/src/` (complete)
- Pages: `client/src/pages/`
- App: `client/src/App.jsx`
- Entry: `client/src/main.jsx`

All converted MERN stack code is contained within these two folders. The old PHP/HTML files remain in the root directory for reference but are no longer used.


