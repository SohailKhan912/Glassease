# GlassEase MERN Stack Project Structure

## 📁 Project Organization

```
glassease/
├── server/                 # Backend (Node.js/Express)
│   ├── src/
│   │   ├── index.js        # Server entry point
│   │   ├── lib/
│   │   │   └── db.js       # MongoDB connection
│   │   ├── models/         # MongoDB models
│   │   │   ├── User.js
│   │   │   ├── Order.js
│   │   │   └── Feedback.js
│   │   ├── routes/         # API routes
│   │   │   ├── auth.js
│   │   │   ├── orders.js
│   │   │   ├── feedback.js
│   │   │   └── upload.js
│   │   └── middleware/
│   │       └── auth.js     # JWT authentication
│   ├── uploads/            # Uploaded images (created at runtime)
│   ├── package.json
│   └── .env                # Environment variables (create from README)
│
├── client/                 # Frontend (React/Vite)
│   ├── src/
│   │   ├── main.jsx        # React entry point
│   │   ├── App.jsx         # Main app component with routing
│   │   └── pages/          # Page components
│   │       ├── Home.jsx
│   │       ├── Gallery.jsx
│   │       ├── Book.jsx
│   │       ├── Cart.jsx
│   │       ├── Track.jsx
│   │       ├── Feedback.jsx
│   │       ├── Login.jsx
│   │       └── Dashboard.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── README.md               # Setup instructions
└── .gitignore
```

## 🔄 Migration Summary

### Converted from PHP to MERN:

**Backend (server/):**
- `config.php` → `server/src/lib/db.js` (MongoDB connection)
- `login.php` → `server/src/routes/auth.js` (JWT-based auth)
- `submit_booking.php` → `server/src/routes/orders.js` (POST /api/orders)
- `track.php` → `server/src/routes/orders.js` (GET /api/orders/track)
- `dashboard.php` → `server/src/routes/orders.js` (GET /api/orders)
- `update_status.php` → `server/src/routes/orders.js` (PATCH /api/orders/:id/status)
- `feedback.php` → `server/src/routes/feedback.js`
- File uploads → `server/src/routes/upload.js` (multer)

**Frontend (client/):**
- `index.html` → `client/src/pages/Home.jsx`
- `gallery.html` → `client/src/pages/Gallery.jsx`
- `book.html` → `client/src/pages/Book.jsx`
- `cart.html` → `client/src/pages/Cart.jsx`
- `track.php` → `client/src/pages/Track.jsx`
- `feedback.php` → `client/src/pages/Feedback.jsx`
- `login.php` → `client/src/pages/Login.jsx`
- `dashboard.php` → `client/src/pages/Dashboard.jsx`

## 🚀 Quick Start

1. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create server/.env:**
   ```
   PORT=4000
   MONGODB_URI=mongodb://127.0.0.1:27017/glassease
   JWT_SECRET=change_this_secret
   ```

3. **Start backend:**
   ```bash
   cd server
   npm run dev
   ```

4. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

5. **Start frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📝 Notes

- All MERN stack code is in `server/` and `client/` folders
- Old PHP files remain in root for reference (can be deleted after verification)
- MongoDB must be running before starting the server
- The frontend proxies API requests to the backend via vite.config.js

