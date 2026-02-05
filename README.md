# React Playground

A comprehensive monorepo containing multiple React projects and backend services for learning and experimentation. This workspace includes chatbot applications, e-commerce projects (both frontend and backend), and archived legacy code.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Projects Overview](#projects-overview)
- [Quick Start](#quick-start)
  - [Running All Projects Together](#running-all-projects-together)
  - [Individual Project Setup](#individual-project-setup)
  - [Creating a New Project with Vite](#creating-a-new-project-with-vite)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Frontend-Backend Integration](#frontend-backend-integration)
- [Testing](#testing)
- [Code Quality & Linting](#code-quality--linting)
- [Troubleshooting](#troubleshooting)
- [References](#references)
- [Development Tips](#development-tips)
- [Contributing](#contributing)
- [Appendix A: Creating a React Project From Scratch](#appendix-a-creating-a-react-project-from-scratch)

## Prerequisites

All projects in this workspace require **Node.js 22+**.

### How to Install Node.js
1. Visit https://nodejs.org/
2. Download and install the LTS version
3. Verify installation: `node --version`
4. Restart VS Code after installation

## Projects Overview

### 🤖 Chatbot Project
**Location:** [`chatbot-project/`](chatbot-project/)

A simple React-based chatbot application built with Vite.

- **Tech Stack:** React 19, Vite 6
- **Start:** `cd chatbot-project && npm install && npm run dev`
- **Port:** Default Vite port (usually 5173)
- **Documentation:** [chatbot-project/README.md](chatbot-project/README.md)

### 🛒 E-Commerce Project (TypeScript)
**Location:** [`ecommerce-project/`](ecommerce-project/)

Full-featured e-commerce frontend with shopping cart, checkout, and order tracking.

- **Tech Stack:** React 19, TypeScript, React Router, Axios, Day.js
- **Testing:** Vitest with React Testing Library
- **Start:** `cd ecommerce-project && npm install && npm run dev`
- **Build:** `npm run build`
- **Features:**
  - Product browsing and search
  - Shopping cart management
  - Checkout with delivery options
  - Order tracking
  - Payment summary
- **Documentation:** [ecommerce-project/README.md](ecommerce-project/README.md)

### 🖥️ E-Commerce Backend
**Location:** [`ecommerce-backend/`](ecommerce-backend/)

Express.js REST API backend for the e-commerce project. 95% AI-generated code.

- **Tech Stack:** Express.js, Sequelize ORM, SQL.js, CORS enabled
- **Start:** `cd ecommerce-backend && npm install && npm run dev`
- **Port:** 3000
- **Database:** SQLite (in-memory, resets on restart)
- **API Endpoints:**
  - Products & Delivery Options
  - Shopping Cart (CRUD operations)
  - Orders Management
  - Payment Summary
- **Documentation:**
  - [Setup Guide](ecommerce-backend/README.md)
  - [API Documentation](ecommerce-backend/documentation.md) - Comprehensive API reference
  - [Troubleshooting](ecommerce-backend/troubleshooting.md)
- **Video Tutorial:** [Part 1 - Create the Backend](https://youtu.be/vBprybSmJs8)

### 📦 Old Projects
**Location:** [`old-projects/`](old-projects/)

Archived code including:
- `ecommerce-project-js/` - JavaScript version of the e-commerce project (pre-TypeScript migration)
- `react-basics/` - React fundamentals examples (chatbot.html, react-basics.html)

## Quick Start

### Running All Projects Together

1. **Start the Backend** (Terminal 1):
   ```powershell
   cd ecommerce-backend
   npm install
   npm run dev
   ```

2. **Start E-Commerce Frontend** (Terminal 2):
   ```powershell
   cd ecommerce-project
   npm install
   npm run dev
   ```

3. **Start Chatbot** (Terminal 3):
   ```powershell
   cd chatbot-project
   npm install
   npm run dev
   ```

### Individual Project Setup

Each project can run independently:

```powershell
# Navigate to project folder
cd <project-name>

# Install dependencies
npm install

# Run development server
npm run dev
```

### Creating a New Project with Vite

To add a new React project to this workspace using `create-vite`:

```powershell
# Using npm
npm create vite@latest

# Or using npm with direct project name
npm create vite@latest my-new-project

# Or using pnpm
pnpm create vite

# Or using yarn
yarn create vite
```

**Interactive Setup:**
1. Enter project name (e.g., `my-new-project`)
2. Select framework: **React**
3. Select variant:
   - **TypeScript** (recommended for new projects)
   - **TypeScript + SWC** (faster compilation)
   - **JavaScript**
   - **JavaScript + SWC**

**Then initialize the project:**
```powershell
cd my-new-project
npm install
npm run dev
```

**Available Templates:**
- `react` - React with JavaScript
- `react-ts` - React with TypeScript
- `react-swc` - React with SWC (faster)
- `react-swc-ts` - React with TypeScript + SWC

**Example with template preset:**
```powershell
npm create vite@latest my-app -- --template react-ts
```

**What You Get:**
- ⚡ Lightning-fast HMR (Hot Module Replacement)
- 📦 Optimized build with Rollup
- 🎨 ESLint configuration
- 🔧 Vite config pre-configured
- 📁 Organized project structure

## Project Structure

```
react-playground/
├── README.md                          # This file
├── chatbot-project/                   # React chatbot app
│   ├── src/
│   │   ├── components/               # Chat components
│   │   └── App.jsx
│   └── package.json
├── ecommerce-backend/                 # Express API server
│   ├── backend/                       # JSON data storage
│   ├── defaultData/                   # Default seed data
│   ├── models/                        # Sequelize models
│   ├── routes/                        # API route handlers
│   ├── documentation.md              # Full API reference
│   ├── troubleshooting.md           # Backend troubleshooting
│   └── server.js
├── ecommerce-project/                 # React e-commerce frontend (TypeScript)
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   ├── pages/                    # Page components
│   │   │   ├── checkout/            # Checkout flow
│   │   │   ├── home/                # Product listing
│   │   │   └── orders/              # Order tracking
│   │   └── utils/                    # Utility functions
│   └── package.json
└── old-projects/                      # Archived projects
    ├── ecommerce-project-js/         # Legacy JavaScript version
    └── react-basics/                 # React learning examples
```

## Technology Stack

### Frontend Projects
- **[React 19](https://react.dev/)** - Latest React with modern hooks
- **[Vite 6](https://vitejs.dev/)** - Fast build tool and dev server
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe code (ecommerce-project)
- **[React Router 7](https://reactrouter.com/)** - Client-side routing
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Day.js](https://day.js.org/)** - Date formatting
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[ESLint](https://eslint.org/)** - Code linting

### Backend
- **[Express.js 4](https://expressjs.com/)** - Web framework
- **[Sequelize 6](https://sequelize.org/)** - ORM for database operations
- **[SQL.js](https://sql.js.org/)** - SQLite in JavaScript
- **[CORS](https://github.com/expressjs/cors)** - Cross-origin resource sharing
- **[Nodemon](https://nodemon.io/)** - Auto-restart on file changes

### Special Features
- **[React Compiler](https://react.dev/learn/react-compiler)** - Experimental React 19 compiler for automatic optimization (ecommerce-project)

## Frontend-Backend Integration

The e-commerce project uses a seamless integration between frontend and backend:

### Development Setup

**Vite Proxy Configuration** ([vite.config.ts](ecommerce-project/vite.config.ts)):
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000'  // Backend server
    },
    '/images': {
      target: 'http://localhost:3000'  // Static assets
    }
  }
}
```

**What this means:**
- Frontend runs on `http://localhost:5173` (Vite dev server)
- Backend runs on `http://localhost:3000` (Express server)
- All `/api/*` requests are automatically proxied to the backend
- Images served by backend are accessible from frontend
- No CORS issues during development

**Example API Call:**
```typescript
// In your React component
import axios from 'axios';

// This call goes to http://localhost:3000/api/products
const response = await axios.get('/api/products');
```

### Production Build

**Build Configuration:**
```typescript
build: {
  outDir: '../ecommerce-backend/dist'
}
```

**Deployment Flow:**
1. Build frontend: `cd ecommerce-project && npm run build`
2. Frontend builds into `ecommerce-backend/dist/`
3. Backend serves frontend as static files from `dist/`
4. Single server serves both frontend and API

**Backend Static File Serving:**
```javascript
// In server.js
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
```

### How to Deploy Together

```powershell
# 1. Build the frontend
cd ecommerce-project
npm run build

# 2. Start the backend (serves both API and frontend)
cd ../ecommerce-backend
npm start

# 3. Access at http://localhost:3000
```

### API Endpoints

All API endpoints are documented in [ecommerce-backend/documentation.md](ecommerce-backend/documentation.md).

**Quick reference:**
- `GET /api/products` - List all products
- `GET /api/cart-items` - Get cart contents
- `POST /api/cart-items` - Add item to cart
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get all orders

## Testing

The ecommerce-project includes comprehensive unit tests using Vitest and React Testing Library.

### Running Tests

```powershell
# Run all tests
cd ecommerce-project
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test HomePage.test
```

### Test Configuration

**Test Setup** ([vitest.config.js](ecommerce-project/vitest.config.js)):
```javascript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',      // Simulates browser environment
    globals: true,              // No need to import test functions
    setupFiles: './setupTests.js',  // Setup file
  }
});
```

**Setup File** ([setupTests.js](ecommerce-project/setupTests.js)):
- Configures `@testing-library/jest-dom` matchers
- Adds custom assertions like `toBeInTheDocument()`

### Existing Tests

**Unit Tests:**
- [src/utils/money.test.js](ecommerce-project/src/utils/money.test.js) - Money formatting utilities
- [src/pages/home/HomePage.test.jsx](ecommerce-project/src/pages/home/HomePage.test.jsx) - Home page component
- [src/pages/home/Product.test.jsx](ecommerce-project/src/pages/home/Product.test.jsx) - Product component

**Example Test Structure:**
```javascript
import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component Name', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<Component />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1. **Mock API Calls:**
   ```javascript
   import axios from 'axios';
   import { vi } from 'vitest';
   
   vi.mock('axios');
   axios.get.mockResolvedValue({ data: mockData });
   ```

2. **Test User Behavior, Not Implementation:**
   - Use `screen.getByRole()`, `getByText()` instead of class names
   - Test what users see and do

3. **Async Testing:**
   ```javascript
   // Wait for elements to appear
   const element = await screen.findByText('Loaded');
   ```

4. **Test Accessibility:**
   - Ensure components have proper roles and labels
   - Use `getByRole()` to verify semantic HTML

### VS Code Testing Integration

For better testing experience, install:
- **Vitest Extension**: `Ctrl+P` → `ext install vitest.explorer`

Benefits:
- Run tests from sidebar
- See test results inline
- Debug tests visually

## Code Quality & Linting

All projects include **ESLint** configuration for maintaining code quality and catching errors early.

### What is ESLint?

ESLint is a static code analysis tool that:
- 🐞 Finds bugs and potential errors before runtime
- 🎨 Enforces consistent code style
- ⚖️ Checks React-specific best practices (Hooks rules, component patterns)
- 🛡️ Validates TypeScript usage
- ⚡ Integrates with VS Code for real-time feedback

### Running Linting

```powershell
# Check for issues in any project
cd <project-folder>
npm run lint

# Auto-fix issues where possible
npm run lint -- --fix
```

### VS Code Integration (Recommended)

**Install ESLint Extension:**
1. Open Extensions (Ctrl+Shift+X)
2. Search for "ESLint"
3. Install "ESLint" by Microsoft

**Or use Quick Install:**
```
Ctrl+P, then paste: ext install dbaeumer.vscode-eslint
```

**Benefits:**
- See errors and warnings as you type
- Hover for explanations and quick fixes
- Auto-fix on save (optional)

### Recommended VS Code Settings

Add to your workspace `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ]
}
```

This automatically fixes linting issues when you save files.

### What Gets Checked

**JavaScript/TypeScript:**
- Unused variables
- Missing semicolons
- Inconsistent formatting
- Potential runtime errors

**React-Specific:**
- React Hooks dependency arrays
- Component export patterns (for HMR)
- Missing prop types (when applicable)

**TypeScript:**
- Type safety violations
- Proper type annotations
- No implicit any types

### ESLint vs TypeScript

| Feature           | TypeScript | ESLint          |
| ----------------- | ---------- | --------------- |
| Type checking     | ✅ Yes      | ❌ No            |
| Code style        | ❌ No       | ✅ Yes           |
| React Hooks rules | ❌ No       | ✅ Yes           |
| Unused variables  | ⚠️ Basic    | ✅ Comprehensive |
| Auto-fix          | ❌ No       | ✅ Yes           |

**Use both together** for comprehensive code quality!

### Common ESLint Rules in This Workspace

- `react-hooks/rules-of-hooks` - Enforces Hooks rules
- `react-hooks/exhaustive-deps` - Checks Hook dependencies
- `react-refresh/only-export-components` - Ensures HMR compatibility
- `@typescript-eslint/no-unused-vars` - Catches unused variables
- `no-console` - Warns about console.log (can be disabled)

### Disabling Rules (When Needed)

```typescript
// Disable for one line
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => { ... }, []);

// Disable for entire file
/* eslint-disable react-hooks/exhaustive-deps */

// Disable specific rule in config (eslint.config.js)
rules: {
  'no-console': 'off'
}
```

**Note:** Only disable rules when you understand why and it's intentional!

## Troubleshooting

### Windows PowerShell Script Execution Error

If you get a security error when running `npm`:

```powershell
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ npm
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess

```

**Solution:**
1. In your command line, run:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
2. Run `npm` again

### Node.js Not Recognized

If Node.js commands don't work after installation:
1. Restart VS Code completely
2. Open a new terminal
3. Verify: `node --version`

### Port Already in Use

If a project won't start due to port conflicts:
1. Find the process: `netstat -ano | findstr :PORT_NUMBER`
2. Kill the process: `taskkill /PID <PID> /F`
3. Or choose a different port in the project configuration

### Backend Not Responding

1. Ensure backend is running on port 3000
2. Check CORS configuration if making requests from different origin
3. Review [ecommerce-backend/troubleshooting.md](ecommerce-backend/troubleshooting.md) for backend-specific issues

### Frontend Build Errors

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache: `npm run dev -- --force`

### Testing Issues

If tests fail:

1. **Ensure all dependencies are installed:**
   ```powershell
   cd ecommerce-project
   npm install
   ```

2. **Clear Vitest cache:**
   ```powershell
   npm test -- --no-cache
   ```

3. **Check for syntax errors:**
   ```powershell
   npm run lint
   ```

4. **Mock issues** - Ensure axios is properly mocked:
   ```javascript
   import { vi } from 'vitest';
   vi.mock('axios');
   ```

## References

- **Original Course:** [SuperSimpleDev React Course](https://github.com/SuperSimpleDev/react-course/)
- **Backend Repository:** [E-Commerce Backend AI](https://github.com/SuperSimpleDev/ecommerce-backend-ai)

## Development Tips

- **Hot Module Replacement (HMR):** All projects support HMR - changes appear instantly
- **TypeScript:** The ecommerce-project uses TypeScript for better type safety
- **Testing:** Run tests with `npm test` in ecommerce-project
- **Linting:** All projects include ESLint - run `npm run lint` to check code quality
- **Building:** Production builds with `npm run build`
- **Debugging:** Use VS Code's built-in debugger with React Developer Tools

## Contributing

This is a learning playground. Feel free to:
- Experiment with code
- Add new features
- Refactor and improve
- Create new projects in the workspace

## License

Educational purposes - based on SuperSimpleDev course materials.

---

## Appendix A: Creating a React Project From Scratch

To start a completely new React project in any location (outside this workspace):

### Step 1: Choose Your Location
```powershell
# Navigate to where you want to create your project
cd C:\dev\projects
# Or create a new folder
mkdir my-projects
cd my-projects
```

### Step 2: Create the Project
```powershell
# Interactive mode (recommended for beginners)
npm create vite@latest

# Or specify everything upfront
npm create vite@latest my-react-app -- --template react-ts
```

### Step 3: Follow the Prompts
1. **Project name:** Enter your project name (e.g., `my-awesome-app`)
2. **Framework:** Select `React`
3. **Variant:** Choose one:
   - `TypeScript + SWC` ⭐ **Recommended** - Modern, fast, type-safe
   - `TypeScript` - Type-safe with Babel
   - `JavaScript + SWC` - Fast compilation without types
   - `JavaScript` - Classic setup

### Step 4: Initialize and Run
```powershell
cd my-react-app
npm install
npm run dev
```

### Step 5: Open in VS Code
```powershell
code .
```

### What Gets Created:
```
my-react-app/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── App.tsx         # Main component
│   ├── App.css         # Component styles
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite configuration
└── eslint.config.js    # Linting rules
```

### Available Commands:
```powershell
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

### Next Steps:
1. **Install React Router** (for navigation):
   ```powershell
   npm install react-router-dom
   ```

2. **Install Axios** (for API calls):
   ```powershell
   npm install axios
   ```

3. **Add Testing** (Vitest + React Testing Library):
   ```powershell
   npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
   ```

4. **Initialize Git**:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   ```

### Alternative: Using Other Tools

**Create React App (Legacy - Not Recommended):**
```powershell
npx create-react-app my-app
```
*Note: CRA is no longer maintained. Use Vite instead.*

**Next.js (For Full-Stack Apps):**
```powershell
npx create-next-app@latest
```

**Remix (For Server-Side Rendering):**
```powershell
npx create-remix@latest
```

### Finding and Adding Dependencies

#### Searching for Packages

1. **NPM Registry** - Visit https://www.npmjs.com/
   - Search for packages by name or functionality
   - Check package stats: downloads, version, last update
   - Read documentation and examples

2. **Command Line Search:**
   ```powershell
   npm search <keyword>
   # Example: npm search "react table"
   ```

3. **GitHub** - Check the repository for:
   - Stars and activity
   - Open issues
   - Last commit date
   - Documentation quality

#### Installing Dependencies

**Regular Dependencies** (needed in production):
```powershell
# Install a single package
npm install <package-name>

# Install specific version
npm install react-router-dom@6.21.0

# Install multiple packages at once
npm install axios dayjs react-icons

# Short form
npm i <package-name>
```

**Development Dependencies** (only for development):
```powershell
# Install as dev dependency
npm install --save-dev <package-name>

# Short form
npm i -D vitest @testing-library/react

# Examples of dev dependencies:
npm i -D eslint prettier typescript @types/react
```

#### Common React Packages

**Routing:**
```powershell
npm install react-router-dom
```

**HTTP Requests:**
```powershell
npm install axios
# or
npm install @tanstack/react-query  # with caching
```

**State Management:**
```powershell
npm install zustand           # Lightweight
npm install redux @reduxjs/toolkit  # Full-featured
npm install jotai             # Atomic state
```

**UI Component Libraries:**
```powershell
npm install @mui/material @emotion/react @emotion/styled  # Material UI
npm install @chakra-ui/react @emotion/react              # Chakra UI
npm install antd                                          # Ant Design
```

**Forms:**
```powershell
npm install react-hook-form
npm install formik yup
```

**Date/Time:**
```powershell
npm install dayjs      # Lightweight (2KB)
npm install date-fns   # Modular
```

**Icons:**
```powershell
npm install react-icons
npm install lucide-react
```

**Styling:**
```powershell
npm install tailwindcss postcss autoprefixer  # Tailwind CSS
npm install styled-components                  # CSS-in-JS
npm install sass                               # SCSS support
```

#### Managing Dependencies

**View installed packages:**
```powershell
npm list --depth=0
```

**Check for outdated packages:**
```powershell
npm outdated
```

**Update packages:**
```powershell
# Update specific package
npm update <package-name>

# Update all packages (respecting semver)
npm update

# Update to latest (including major versions) - use carefully
npm install <package-name>@latest
```

**Remove packages:**
```powershell
npm uninstall <package-name>

# Remove dev dependency
npm uninstall -D <package-name>
```

**Check package info:**
```powershell
npm info <package-name>
npm view <package-name> versions
```

#### Best Practices

1. **Check Before Installing:**
   - Last update date (avoid abandoned packages)
   - Weekly downloads (popularity indicator)
   - GitHub stars and issues
   - Bundle size (use https://bundlephobia.com/)

2. **Version Control:**
   - Commit `package.json` and `package-lock.json`
   - Use exact versions for critical dependencies
   - Document why you chose specific packages

3. **Security:**
   ```powershell
   npm audit              # Check for vulnerabilities
   npm audit fix          # Auto-fix vulnerabilities
   npm audit fix --force  # Force updates (may break)
   ```

4. **Keep Dependencies Updated:**
   - Regularly check for updates
   - Read changelogs before updating
   - Test after updates

5. **Minimize Dependencies:**
   - Don't install packages for simple tasks you can code yourself
   - Check if features are already in React or JavaScript
   - Consider bundle size impact