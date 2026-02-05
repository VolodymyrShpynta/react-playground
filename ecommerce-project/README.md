# E-Commerce Project (TypeScript)

A modern, full-featured e-commerce frontend application built with React 19, TypeScript, and Vite. This project demonstrates a complete shopping experience with product browsing, cart management, checkout flow, and order tracking.

## 🚀 Features

- **Product Catalog** - Browse products with images, ratings, and pricing
- **Search Functionality** - Find products by name or keywords
- **Shopping Cart** - Add/remove items, update quantities, view cart total
- **Delivery Options** - Choose shipping speed (Standard, Express, Same-day)
- **Checkout Process** - Review order with delivery estimates and payment summary
- **Order Tracking** - View order history with detailed product information
- **Responsive Design** - Works on desktop and mobile devices
- **Type Safety** - Full TypeScript coverage for better developer experience
- **Unit Testing** - Comprehensive test suite with Vitest
- **React Compiler** - Uses experimental React 19 compiler for automatic optimizations

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Backend Integration](#backend-integration)
- [Testing](#testing)
- [Technology Stack](#technology-stack)
- [Development Workflow](#development-workflow)
- [Build and Deployment](#build-and-deployment)
- [ESLint Configuration](#eslint-configuration)

## Prerequisites

- **Node.js 22+** - [Download here](https://nodejs.org/)
- **Backend API** - The [ecommerce-backend](../ecommerce-backend/) must be running on port 3000

## Quick Start

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

**Note:** Make sure the backend server is running before starting the frontend:
```powershell
# In a separate terminal
cd ../ecommerce-backend
npm run dev
```

## Available Scripts

```powershell
npm run dev      # Start development server with HMR
npm run build    # Build for production (outputs to ../ecommerce-backend/dist)
npm run preview  # Preview production build locally
npm run lint     # Check code quality with ESLint
npm run lint -- --fix  # Auto-fix linting issues
npm test         # Run unit tests
npm test -- --watch    # Run tests in watch mode
npm test -- --coverage # Generate test coverage report
```

## Project Structure

```
ecommerce-project/
├── public/
│   └── images/              # Product images, icons, ratings
├── src/
│   ├── components/
│   │   └── Header.tsx       # Navigation header with cart icon
│   ├── pages/
│   │   ├── home/
│   │   │   ├── HomePage.jsx        # Product listing page
│   │   │   ├── Product.jsx         # Individual product card
│   │   │   ├── ProductsGrid.jsx    # Grid layout for products
│   │   │   ├── HomePage.test.jsx   # Unit tests
│   │   │   └── Product.test.jsx    # Unit tests
│   │   ├── checkout/
│   │   │   ├── CheckoutPage.jsx    # Main checkout page
│   │   │   ├── OrderSummary.jsx    # Cart items summary
│   │   │   ├── DeliveryOptions.jsx # Shipping options
│   │   │   └── PaymentSummary.jsx  # Order total and place order
│   │   └── orders/
│   │       └── OrdersPage.jsx      # Order history page
│   ├── utils/
│   │   ├── money.ts         # Money formatting utilities
│   │   └── money.test.js    # Utility tests
│   ├── App.tsx              # Main app with routing and cart state
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── eslint.config.js         # ESLint configuration
├── vite.config.ts           # Vite configuration (includes proxy)
├── vitest.config.js         # Vitest test configuration
├── setupTests.js            # Test setup file
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Backend Integration

### API Proxy Configuration

The frontend connects to the backend through Vite's proxy (configured in [vite.config.ts](vite.config.ts)):

```typescript
server: {
  proxy: {
    '/api': 'http://localhost:3000',      // API requests
    '/images': 'http://localhost:3000'    // Static images
  }
}
```

**What this means:**
- All requests to `/api/*` are forwarded to `http://localhost:3000`
- All requests to `/images/*` are forwarded to the backend
- No CORS issues during development

### API Endpoints Used

```typescript
// Products
GET /api/products                    // List all products
GET /api/products?search={term}      // Search products

// Cart
GET /api/cart-items?expand=product   // Get cart with product details
POST /api/cart-items                 // Add item to cart
PUT /api/cart-items/:productId       // Update cart item
DELETE /api/cart-items/:productId    // Remove from cart

// Checkout
GET /api/delivery-options?expand=estimatedDeliveryTime
GET /api/payment-summary             // Calculate order total

// Orders
POST /api/orders                     // Create order from cart
GET /api/orders?expand=products      // Get order history
```

For complete API documentation, see [../ecommerce-backend/documentation.md](../ecommerce-backend/documentation.md).

### Example API Usage

```typescript
import axios from 'axios';

// Fetch products
const response = await axios.get('/api/products');
const products = response.data;

// Add to cart
await axios.post('/api/cart-items', {
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
});

// Place order
await axios.post('/api/orders');
```

## Testing

This project uses **Vitest** and **React Testing Library** for unit testing.

### Running Tests

```powershell
# Run all tests once
npm test

# Watch mode (re-runs on file changes)
npm test -- --watch

# Generate coverage report
npm test -- --coverage

# Run specific test file
npm test HomePage.test
```

### Test Files

- [src/utils/money.test.js](src/utils/money.test.js) - Money formatting function tests
- [src/pages/home/HomePage.test.jsx](src/pages/home/HomePage.test.jsx) - Home page component tests
- [src/pages/home/Product.test.jsx](src/pages/home/Product.test.jsx) - Product component tests

### Test Configuration

Tests are configured in [vitest.config.js](vitest.config.js):
- **Environment:** jsdom (simulates browser)
- **Globals:** true (no need to import `describe`, `it`, `expect`)
- **Setup:** [setupTests.js](setupTests.js) (configures @testing-library/jest-dom)

### Writing Tests

```javascript
import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('Component Name', () => {
  it('renders correctly', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    
    render(<HomePage />);
    
    const products = await screen.findAllByTestId('product-container');
    expect(products).toHaveLength(2);
  });
});
```

## Technology Stack

### Core Technologies
- **[React 19](https://react.dev/)** - UI library with modern hooks
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite 6](https://vitejs.dev/)** - Fast build tool and dev server
- **[React Router 7](https://reactrouter.com/)** - Client-side routing

### Data & API
- **[Axios](https://axios-http.com/)** - HTTP client for API calls
- **[Day.js](https://day.js.org/)** - Lightweight date formatting

### Testing & Quality
- **[Vitest](https://vitest.dev/)** - Fast unit test framework
- **[React Testing Library](https://testing-library.com/react)** - Component testing utilities
- **[ESLint](https://eslint.org/)** - Code linting and style enforcement

### Build Tools & Optimization
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** - Uses Babel for Fast Refresh with React Compiler support
- **[React Compiler](https://react.dev/learn/react-compiler)** - Experimental automatic optimization (React 19)

**Alternative Vite Plugin:**
This project uses `@vitejs/plugin-react` with Babel to enable the React Compiler. If you don't need the React Compiler, you can switch to `@vitejs/plugin-react-swc` for faster builds:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // SWC instead of Babel

export default defineConfig({
  plugins: [react()],
  // ... rest of config
})
```

## Development Workflow

### 1. Start Development Environment

```powershell
# Terminal 1: Start backend
cd ../ecommerce-backend
npm run dev

# Terminal 2: Start frontend
cd ../ecommerce-project
npm run dev
```

### 2. Make Changes

- Edit components in `src/`
- Changes appear instantly via HMR (Hot Module Replacement)
- TypeScript errors show in VS Code and terminal

### 3. Run Tests

```powershell
# Run tests in watch mode while developing
npm test -- --watch
```

### 4. Check Code Quality

```powershell
# Lint your code
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### 5. Build for Production

```powershell
npm run build
```

## Build and Deployment

### Production Build

```powershell
npm run build
```

**Build Output:**
- Compiled code goes to `../ecommerce-backend/dist/`
- Backend serves the frontend from this folder
- Single server deployment (backend + frontend)

### Build Configuration

In [vite.config.ts](vite.config.ts):
```typescript
build: {
  outDir: '../ecommerce-backend/dist'
}
```

### Deploy Together

```powershell
# 1. Build frontend
cd ecommerce-project
npm run build

# 2. Start backend (serves both API and frontend)
cd ../ecommerce-backend
npm start

# 3. Access at http://localhost:3000
```

### Preview Build Locally

```powershell
# Preview production build before deploying
npm run preview
```

## ESLint Configuration

### Current Setup

The project uses ESLint with TypeScript and React-specific rules. Configuration is in [eslint.config.js](eslint.config.js).

### Expanding ESLint (Optional)

For stricter type-aware linting in production applications, you can enable advanced TypeScript rules:

```js
// eslint.config.js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,     // Type-aware rules
    // Or for even stricter rules:
    // ...tseslint.configs.strictTypeChecked,
    // For stylistic rules:
    // ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

### Additional React-Specific Plugins

For more comprehensive React linting, you can install additional plugins:

```powershell
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

Then update [eslint.config.js](eslint.config.js):

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Troubleshooting

### Backend Connection Issues

**Problem:** API calls fail with network errors

**Solution:**
1. Ensure backend is running: `cd ../ecommerce-backend && npm run dev`
2. Verify backend is on port 3000
3. Check Vite proxy configuration in [vite.config.ts](vite.config.ts)

### Tests Failing

**Problem:** Tests error or timeout

**Solution:**
```powershell
# Clear cache and reinstall
rm -rf node_modules
npm install

# Clear Vitest cache
npm test -- --no-cache
```

### TypeScript Errors

**Problem:** Types not found or incorrect

**Solution:**
```powershell
# Rebuild TypeScript
npm run build

# Or restart VS Code TypeScript server
# Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

### Build Errors

**Problem:** Build fails

**Solution:**
```powershell
# Clean and rebuild
rm -rf dist
rm -rf node_modules
npm install
npm run build
```

## Contributing

This is a learning project. Feel free to:
- Add new features
- Improve existing code
- Write more tests
- Enhance UI/UX

## License

Educational purposes - part of the [React Playground](../README.md) workspace.
