# eCommerce Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```bash
copy .env.example .env
```

Edit `.env` with your MongoDB connection:
```
PORT=5000
MONGODB_URI=mongodb://root:example@localhost:27017/ecommerce?authSource=admin
JWT_SECRET=your_secret_key_change_this_in_production
```

**Note:** If using the provided Docker MongoDB, the credentials are:
- Username: `root`
- Password: `example`
- Connection string includes `?authSource=admin` for authentication

**Create Admin User:**
```bash
npm run create-admin
```

This creates an admin account:
- **Email:** `admin@ecommerce.com`
- **Password:** `admin123`

**Note:** Make sure MongoDB is running before creating the admin!

Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Login Credentials

### Admin Login
- URL: http://localhost:3000/admin/login
- Email: `admin@ecommerce.com`
- Password: `admin123`

### Customer Account
- Register a new account at: http://localhost:3000/register
- Or login at: http://localhost:3000/login

## Features

### Customer Features (All Require Login)
- **Login/Register required** to access the store
- Browse products (login required)
- View product details (login required)
- Add to cart (login required)
- Checkout (login required)
- View order history (login required)
- Manage profile (login required)

### Admin Features (Admin Login Required)
- **Add new products** with images
- **Edit existing products**
- **Delete products**
- View all orders
- Update order status
- Manage inventory

## Important Notes

1. **Authentication Required:** Users must login or register to view products and shop
2. **Products Access:** All product pages require authentication
3. **Cart & Checkout:** Login required for cart and checkout
4. **Admin Access:** Use the dedicated admin login page at `/admin/login`
5. **Image Uploads:** Product images are stored in `backend/uploads/` folder
6. **Database:** Make sure MongoDB is running before starting the backend

## Troubleshooting

### Admin user already exists
If you see "Admin user already exists", you can use the existing credentials or manually delete the admin user from MongoDB and run `npm run create-admin` again.

### Port already in use
If port 5000 or 3000 is already in use, change the PORT in backend `.env` or frontend `vite.config.js`.
