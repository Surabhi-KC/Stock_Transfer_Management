# Stock Transfer Management System

A **full-stack inventory and warehouse transfer management system** that allows authenticated users to manage warehouses, stocks, and stock transfers securely with real-time status tracking.

Authentication is handled using **Clerk**  
Database powered by **PostgreSQL + Prisma**  
Backend deployed on **Render**  
Frontend deployed on **Vercel**

---

## Live Demo

- **Frontend (Vercel):**  
  [https://stock-transfer-management-frontend.vercel.app](https://stock-transfer-management-frontend.vercel.app)

- **Backend API (Render):**  
  [https://stock-transfer-management-backend.onrender.com/health](https://stock-transfer-management-backend.onrender.com/health)

---

## Example Usage

1. **Login**
   - Users authenticate securely using Clerk.

2. **Warehouse & Stock Management**
   - Create warehouses and add products with quantities.
   - Stock is isolated per user and warehouse.

3. **Stock Transfers**
   - Create transfer requests between warehouses.
   - System validates product existence and available quantity.

4. **Complete or Cancel Transfers**
   - Completing a transfer moves stock atomically.
   - Cancelling a transfer leaves stock unchanged.

5. **Transfer History**
   - View a timeline of all transfers with status and timestamps.

---

## Features

### Authentication & Security
### Warehouse Management
- Create and list warehouses
- Each warehouse belongs to a specific user
- Warehouses scoped securely per user
### Stock Management
- Add stock to warehouses
- Increment stock quantities safely
- Prevent invalid stock creation during transfers
- Composite uniqueness: userId + warehouseId + productName
### Stock Transfers
- Create transfer requests between warehouses
- Prevent transfers if:
- Source warehouse lacks product
- Insufficient quantity
- Transfer lifecycle:
- **PENDING**
- **COMPLETED**
- **CANCELLED**
### Transfer History & Timeline
- Full timeline of status changes per transfer
- Timestamps recorded for:
- Creation
- Completion
- Cancellation
### Transfer Cancellation
- Pending transfers can be cancelled
- Are recorded in history with timestamp

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Clerk Authentication
- Deployed on **Vercel**

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (NeonDB)
- Clerk Backend SDK
- Deployed on **Render**

---

## Database Schema (Simplified)
```
User (Clerk)
├── Warehouse
│ └── Stock
└── StockTransfer
└── TransferHistory
```

---

## Authentication Flow

1. User signs in via Clerk (frontend)
2. Clerk provides JWT
3. JWT sent in `Authorization` header
4. Backend middleware:
   - Verifies token with Clerk
   - Extracts `userId`
   - Attaches `req.userId`
5. All DB operations scoped to `req.userId`

---

## Project Structure

### Backend
```
backend/
├── prisma/
│ └── schema.prisma
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.js
├── package.json
└── .env
```

### Frontend
```
frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── App.jsx
│ └── main.jsx
├── public/
├── vercel.json
└── package.json
```
## Environment Variables

### Backend (`.env`)
```env
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_test_...
PORT=5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=https://stock-transfer-management-backend.onrender.com
```

---

## API Endpoints

### Warehouses
- GET /warehouses
- POST /warehouses

### Stocks
- GET /stocks?warehouse=ID
- POST /stocks

### Transfers
- GET /transfers
- POST /transfers
- PATCH /transfers/:id/status    (COMPLETE)
- PATCH /transfers/:id/cancel    (CANCEL)

## Local Development

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Deployment Guide

## Backend Deployment (Render)

### 1. Prepare Backend Repository
Ensure only backend files are pushed to the backend repository.

Required files:
- `src/`
- `prisma/`
- `package.json`
- `package-lock.json`
- `.env.example`

Add a health check route:
```js
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
```

### 2. Create Web Service on Render
- Go to Render Dashboard
- Click New → Web Service
- Connect your GitHub backend repository
- Select:
    Environment: Node
    Region: Closest to you

### 3. Render Build & Start Commands
- Use the following configuration:
     Build Command: npm install && npx prisma generate
     Start Command: node src/server.js
 - Do NOT use npm run dev in production.

### 4. Environment Variables (Render)
- Add the following in Render → Environment Variables:
    DATABASE_URL=postgresql://...
    JWT_SECRET=your_secret
    NODE_ENV=production
- Run Prisma migrations: npx prisma migrate deploy

### 5. Verify Backend
- After deployment, test: GET https://your-backend.onrender.com/health
- Expected response: { "status": "ok" }

## Frontend Deployment (Vercel)
### 1. Prepare Frontend
- Update API base URL:
    const API_BASE_URL = "https://your-backend.onrender.com";
- Ensure .env is NOT committed:
    VITE_API_BASE_URL=https://your-backend.onrender.com

### 2. Deploy on Vercel
- Go to Vercel Dashboard
- Click New Project
- Import frontend repository
- Framework: Vite / React
- Build Command: npm run build

### 3. Environment Variables (Vercel)
- Add: VITE_API_BASE_URL=https://your-backend.onrender.com
- Redeploy after saving variables.

### Production Notes
- Render free tier may sleep after inactivity.
- First request may take ~30 seconds.
- All database operations are atomic using Prisma transactions.

  ---
  
## Reason for Choice of Tech Stack

The technology stack for this project was chosen to balance **developer productivity, scalability, security, and real-world industry relevance**.

### Frontend
- **React + Vite**
  - Enables fast development with modern component-based architecture
  - Vite provides lightning-fast hot module replacement and optimized builds
  - React is widely used in production-grade enterprise applications

- **Tailwind CSS**
  - Utility-first approach allows rapid UI development without CSS bloat
  - Ensures consistent design and responsive layouts
  - Makes the UI easily maintainable and scalable

- **React Router**
  - Enables clean client-side routing for a multi-page SPA
  - Works seamlessly with Vercel and modern deployment platforms

- **Clerk Authentication**
  - Provides secure, production-ready authentication out of the box
  - Eliminates the need to manage passwords and session storage manually
  - Supports JWT-based authentication, which integrates cleanly with backend APIs

---

### Backend
- **Node.js + Express**
  - Lightweight and performant for building REST APIs
  - Large ecosystem and community support
  - Ideal for handling concurrent I/O-heavy requests

- **Prisma ORM**
  - Strong type safety and schema-driven database design
  - Simplifies complex relational queries and transactions
  - Reduces runtime errors and improves maintainability

- **PostgreSQL**
  - Reliable, ACID-compliant relational database
  - Well-suited for transactional systems like inventory management
  - Scales well with structured relational data

---

### Deployment & Infrastructure
- **Render**
  - Simple deployment for Node.js services
  - Built-in support for environment variables and auto-restarts
  - Ideal for backend APIs

- **Vercel**
  - Optimized for React applications
  - Automatic CI/CD and global CDN
  - Excellent support for SPA routing

---

### Overall Architecture
The stack supports:
- Secure multi-tenant user isolation
- Atomic database transactions
- Clean separation between frontend and backend
- Scalability for future enhancements





