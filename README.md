# Praisy - Premium Full-Stack Web Application

A modern, secure, and scalable full-stack web application built with Next.js, Node.js, PostgreSQL, and Prisma. Features role-based authentication (Admin/User), a premium UI with animations, and robust security.

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL.
- **Auth:** JWT (HttpOnly Cookies), bcrypt for password hashing.
- **Design:** Modern SaaS aesthetics, Glassmorphism, Responsive Mobile-First.

## 📂 Project Structure

```
/client       # Next.js Frontend
  /src/app    # App Router Pages (Login, Register, Dashboard)
  /src/components # Reusable UI Components
  /src/hooks  # Custom Hooks (useAuth)
  /src/lib    # Utilities

/server       # Node.js Backend
  /src/controllers # Route Controllers
  /src/middleware  # Auth Middleware
  /src/routes      # API Routes
  /prisma          # Database Schema
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL (Running locally or cloud)

### 1. Database Setup

Ensure your PostgreSQL database is running. Update the connection string if necessary.

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (already created):
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/praisy_db?schema=public"
   PORT=5000
   JWT_SECRET="praisy_super_secret_key"
   FRONTEND_URL="http://localhost:3000"
   ```

4. Run Prisma Migrations (This creates the tables):
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the Server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`.

### 3. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (already created):
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```

4. Start the Frontend:
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:3000`.

## 🔐 Credentials

- **Register:** You can register a new user at `/register`.
- **Admin Role:** To create an admin, register a user and select "Admin" from the dropdown (In a real app, this would be restricted, but allowed here for demo purposes).

## ✨ Features

- **Authentication**: Secure Login/Register with JWT and HttpOnly cookies.
- **Role-Based Access**: 
  - **User**: View personal dashboard, stats, profile.
  - **Admin**: View all users, delete users.
- **Protected Routes**: Middleware protects `/dashboard/*` and API endpoints.
- **Premium UI**: Smooth animations with Framer Motion, responsive design, and polished components.

## 🌐 Deployment (Render)

This project is configured for easy deployment on **Render** using a Blueprint.

1.  **Push your code to GitHub.**
2.  **Go to Render Dashboard:** [dashboard.render.com](https://dashboard.render.com).
3.  **Create New Blueprint:** Click `New` -> `Blueprint`.
4.  **Connect your Repository.**
5.  **Approve the Blueprint:** Render will automatically detect the `render.yaml` and set up:
    *   **PostgreSQL Database**
    *   **Express Backend** (as a Web Service)
    *   **Next.js Frontend** (as a Web Service)
6.  **Enjoy!** The services will be inter-connected automatically.

> **Note:** The `render.yaml` defaults to `onrender.com` subdomains. If you use a custom domain, update the `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` environment variables in the Render Dashboard.
