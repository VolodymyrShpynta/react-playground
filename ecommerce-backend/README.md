# E-Commerce Backend API

A RESTful API backend for the e-commerce project built with Express.js, Sequelize ORM, and SQLite. This backend provides product catalog, shopping cart, order management, and payment calculation services.

> 💡 **Note:** 95% of this code was generated with AI as a learning demonstration.

## 📋 Table of Contents

- [E-Commerce Backend API](#e-commerce-backend-api)
  - [📋 Table of Contents](#-table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Available Scripts](#available-scripts)
  - [API Documentation](#api-documentation)
    - [Quick API Reference](#quick-api-reference)
  - [Project Structure](#project-structure)
  - [Technology Stack](#technology-stack)
    - [Core](#core)
    - [Database](#database)
    - [Development](#development)
    - [Additional](#additional)
  - [Database](#database-1)
    - [SQLite (In-Memory)](#sqlite-in-memory)
    - [Data Persistence](#data-persistence)
  - [Frontend Integration](#frontend-integration)
    - [Development Setup](#development-setup)
    - [Production Deployment](#production-deployment)
  - [Configuration](#configuration)
    - [Port Configuration](#port-configuration)
    - [CORS Configuration](#cors-configuration)
  - [Troubleshooting](#troubleshooting)
    - [Quick Fixes](#quick-fixes)
  - [Video Tutorial](#video-tutorial)
  - [Additional Resources](#additional-resources)
  - [Development Notes](#development-notes)
    - [AI-Generated Code](#ai-generated-code)
    - [Exercise Solutions](#exercise-solutions)
  - [License](#license)

## Features

- 🛍️ **Product Management** - List products with search functionality
- 🛒 **Shopping Cart** - Full CRUD operations for cart items
- 📦 **Order Processing** - Create and retrieve orders
- 🚚 **Delivery Options** - Multiple shipping speeds with price calculations
- 💰 **Payment Summary** - Automatic tax and total calculations
- 🔄 **Database Reset** - Reset to default data for testing
- 🌐 **CORS Enabled** - Ready for frontend integration
- 📁 **Static File Serving** - Serves product images and frontend build

## Prerequisites

- **Node.js 22+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## Quick Start

```powershell
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Server runs on http://localhost:3000
```

**Test the API:**
```powershell
# In a browser or with curl
curl http://localhost:3000/api/products
```

## Available Scripts

```powershell
npm run dev      # Start with nodemon (auto-reload on changes)
npm start        # Start production server
npm run zip      # Create deployment zip file
```

## API Documentation

For complete API documentation including all endpoints, request/response formats, and examples, see:

📖 **[API Documentation](documentation.md)**

### Quick API Reference

**Products & Delivery:**
- `GET /api/products` - List all products (with optional search)
- `GET /api/delivery-options` - Get delivery options

**Shopping Cart:**
- `GET /api/cart-items` - Get cart contents
- `POST /api/cart-items` - Add item to cart
- `PUT /api/cart-items/:productId` - Update cart item
- `DELETE /api/cart-items/:productId` - Remove from cart

**Orders:**
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders/:orderId` - Get specific order

**Utilities:**
- `GET /api/payment-summary` - Calculate order total
- `POST /api/reset` - Reset database to defaults

## Project Structure

```
ecommerce-backend/
├── server.js                    # Express app entry point
├── backend/                     # JSON data storage
│   ├── products.json           # Product data
│   ├── cart.json               # Cart state
│   ├── orders.json             # Order history
│   └── deliveryOptions.json    # Shipping options
├── defaultData/                 # Default seed data
│   ├── defaultProducts.js
│   ├── defaultCart.js
│   ├── defaultOrders.js
│   └── defaultDeliveryOptions.js
├── models/                      # Sequelize models
│   ├── Product.js
│   ├── CartItem.js
│   ├── Order.js
│   ├── DeliveryOption.js
│   └── index.js                # Database setup
├── routes/                      # API route handlers
│   ├── products.js
│   ├── cartItems.js
│   ├── orders.js
│   ├── deliveryOptions.js
│   ├── paymentSummary.js
│   └── reset.js
├── images/                      # Product images & icons
├── dist/                        # Frontend build (after npm run build)
├── documentation.md             # Complete API documentation
├── troubleshooting.md          # Common issues & solutions
└── package.json                 # Dependencies & scripts
```

## Technology Stack

### Core
- **[Express.js 4](https://expressjs.com/)** - Web framework
- **[Node.js](https://nodejs.org/)** - Runtime environment

### Database
- **[Sequelize 6](https://sequelize.org/)** - ORM for database operations
- **[SQL.js](https://sql.js.org/)** - SQLite in JavaScript (in-memory)
- **sql.js-as-sqlite3** - Adapter for Sequelize

### Development
- **[Nodemon](https://nodemon.io/)** - Auto-restart on file changes
- **[ESLint](https://eslint.org/)** - Code linting
- **[CORS](https://github.com/expressjs/cors)** - Cross-origin resource sharing

### Additional
- **[patch-package](https://github.com/ds300/patch-package)** - Apply patches to dependencies
- **[archiver](https://www.npmjs.com/package/archiver)** - Create zip files for deployment

## Database

### SQLite (In-Memory)

This backend uses **in-memory SQLite** via SQL.js:

**Characteristics:**
- ✅ Fast and lightweight
- ✅ No installation required
- ✅ Perfect for development and learning
- ⚠️ **Data resets on server restart**
- ⚠️ Not suitable for production

**Database File:**
- `database.sqlite` is created automatically
- File is gitignored (don't commit)
- Reset with `POST /api/reset` or restart server

### Data Persistence

Data is also saved to JSON files in `backend/` folder:
- `products.json` - Product catalog
- `cart.json` - Current cart state
- `orders.json` - Order history
- `deliveryOptions.json` - Shipping options

**On server start:**
1. Checks for existing JSON files
2. If not found, loads defaults from `defaultData/`
3. Synchronizes with SQLite database

## Frontend Integration

### Development Setup

The frontend connects via Vite proxy (configured in `ecommerce-project/vite.config.ts`):

```typescript
// Frontend proxies these to backend
'/api'      → 'http://localhost:3000/api'
'/images'   → 'http://localhost:3000/images'
```

**Running Both:**
```powershell
# Terminal 1: Backend
cd ecommerce-backend
npm run dev

# Terminal 2: Frontend
cd ecommerce-project
npm run dev
```

### Production Deployment

**Build Process:**
```powershell
# 1. Build frontend (outputs to ecommerce-backend/dist/)
cd ecommerce-project
npm run build

# 2. Start backend (serves both API and frontend)
cd ../ecommerce-backend
npm start

# 3. Access everything at http://localhost:3000
```

**What gets served:**
- Frontend: `http://localhost:3000/` (from `dist/`)
- API: `http://localhost:3000/api/*`
- Images: `http://localhost:3000/images/*`

## Configuration

### Port Configuration

Default port: **3000**

Change in `server.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

Or use environment variable:
```powershell
$env:PORT=4000; npm run dev
```

### CORS Configuration

CORS is enabled for all origins (development mode).

For production, restrict in `server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

## Troubleshooting

For common issues and detailed troubleshooting steps, see:

🔧 **[Troubleshooting Guide](troubleshooting.md)**

### Quick Fixes

**Port already in use:**
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

**Database issues:**
```powershell
# Reset database via API
curl -X POST http://localhost:3000/api/reset

# Or restart the server
```

**Module errors:**
```powershell
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Video Tutorial

📺 **Part 1 - Create the Backend:** [Watch on YouTube](https://youtu.be/vBprybSmJs8)

## Additional Resources

- **Frontend Project:** [../ecommerce-project/](../ecommerce-project/)
- **Workspace Root:** [../README.md](../README.md)
- **Original Course:** [SuperSimpleDev React Course](https://github.com/SuperSimpleDev/react-course/)

## Development Notes

### AI-Generated Code

This backend was created as a demonstration of AI-assisted development:
- 95% of code generated with AI assistance
- Excellent for learning and prototyping
- Review and understand code before using in production

### Exercise Solutions

The `exercise-solutions/` folder contains examples and solutions from the video tutorial.

## License

Educational purposes - part of the [React Playground](../README.md) workspace.
