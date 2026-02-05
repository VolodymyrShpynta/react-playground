# React Playground

A comprehensive monorepo containing multiple React projects and backend services for learning and experimentation. This workspace includes chatbot applications, e-commerce projects (both frontend and backend), and archived legacy code.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Projects Overview](#projects-overview)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Troubleshooting](#troubleshooting)
- [References](#references)

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
- **React 19** - Latest React with modern hooks
- **Vite 6** - Fast build tool and dev server
- **TypeScript 5.8** - Type-safe code (ecommerce-project)
- **React Router 7** - Client-side routing
- **Axios** - HTTP client
- **Day.js** - Date formatting
- **Vitest** - Unit testing framework
- **ESLint** - Code linting

### Backend
- **Express.js 4** - Web framework
- **Sequelize 6** - ORM for database operations
- **SQL.js** - SQLite in JavaScript
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Auto-restart on file changes

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

For ecommerce-project tests:
```powershell
cd ecommerce-project
npm test
```

## References

- **Original Course:** [SuperSimpleDev React Course](https://github.com/SuperSimpleDev/react-course/)
- **Backend Repository:** [E-Commerce Backend AI](https://github.com/SuperSimpleDev/ecommerce-backend-ai)
- **React Documentation:** https://react.dev/
- **Vite Documentation:** https://vitejs.dev/
- **TypeScript Documentation:** https://www.typescriptlang.org/

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