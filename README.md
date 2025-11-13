# eCommerce Full-Stack Application

A complete full-stack eCommerce web application with Node.js/Express backend and React frontend.

## Project Structure

```
├── backend/          # Node.js + Express API
└── frontend/         # React + Vite application
```

## Features

### Backend
- User authentication with JWT
- Product management (CRUD operations)
- Order placement and tracking
- Image uploads with Multer
- MongoDB database integration
- Role-based access control (customer/admin)

### Frontend
- Modern React with Vite
- User authentication (login/register)
- **Login required to view products** - secure shopping experience
- Product browsing and search (authenticated users only)
- Shopping cart functionality (authenticated users only)
- Checkout process
- Order history
- Admin dashboard for managing products and orders
- Responsive design

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret:
```
PORT=5000
MONGODB_URI=mongodb://root:example@localhost:27017/ecommerce?authSource=admin
JWT_SECRET=your_secret_key
```

**Note:** The connection string includes MongoDB credentials (root/example) and `authSource=admin` for authentication.

5. Start the server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (admin only)
- PUT `/api/products/:id` - Update product (admin only)
- DELETE `/api/products/:id` - Delete product (admin only)

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/my-orders` - Get user's orders
- GET `/api/orders` - Get all orders (admin only)
- PATCH `/api/orders/:id/status` - Update order status (admin only)

### Users
- GET `/api/users/me` - Get current user profile
- PUT `/api/users/me` - Update user profile

## Admin Account Setup

Create an admin account by running:
```bash
cd backend
npm run create-admin
```

This creates:
- Email: `admin@ecommerce.com`
- Password: `admin123`

**Admin Login:** http://localhost:3000/admin/login

## Important Security Features

### Authentication Required
- Users **must login or register** to access the store
- **Products page** - login required
- **Product details** - login required
- **Shopping cart** - login required
- **Checkout** - login required
- Home page is public with login/register options

### Admin Features
- Dedicated admin login page at `/admin/login`
- Admin can add, edit, and delete products with images
- Admin can manage all orders and update their status
- Product image upload support
- Admin role validation on login

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Express Validator

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Context API for state management

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- Frontend proxies API requests to backend during development
- Hot reload enabled for both frontend and backend
