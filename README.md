GlassEase – MERN Migration

Prereqs
- Node.js 18+
- MongoDB running locally (mongodb://127.0.0.1:27017)

Setup
1) Server
   - cd server
   - npm install
   - Create .env with:
     - PORT=4000
     - MONGODB_URI=mongodb://127.0.0.1:27017/glassease
     - JWT_SECRET=change_this_secret
   - npm run dev

2) Client
   - cd client
   - npm install
   - npm run dev

Key Endpoints (Server)
- POST /api/auth/register { username, password, role? }
- POST /api/auth/login { username, password }
- POST /api/upload (form-data: image)
- POST /api/orders { name, contact, address, door_type, size, glass_type, imagePath? }
- GET  /api/orders (admin/vendor, Bearer token)
- PATCH /api/orders/:id/status { status } (admin/vendor)
- GET /api/orders/track?name=NAME
- POST /api/feedback { order_id, rating, comment }

Front-end Routes
- / (Home)
- /gallery
- /book
- /cart
- /track
- /feedback
- /login
- /dashboard (admin/vendor)

Notes
- Old PHP files remain for reference and can be deleted after verifying the MERN build.

