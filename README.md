# Portfolio CMS

A full-stack portfolio content management system built with a React + Vite frontend and an Express + TypeScript backend. It supports a public portfolio site, an authenticated admin dashboard, and media uploads with Cloudinary, Cloudflare R2, or Supabase-compatible storage.

## What's new

- Updated to a modern React 19 + Vite 8 frontend with React Router 7, TanStack Query, Zustand, and Tailwind-based UI components.
- Added a richer admin experience for managing profile, projects, experience, skills, achievements, certificates, certificate companies, contact messages, and site settings.
- The backend now includes dedicated upload, dashboard, and contact endpoints, along with validation and centralized error handling.
- Supabase environment variables are now required by the server startup configuration.
- Cloudflare R2 support remains available through the S3-compatible integration, alongside Cloudinary.

## Tech stack

### Frontend

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- React Hook Form + Zod
- React Toastify and Framer Motion

### Backend

- Express.js + TypeScript
- MongoDB + Mongoose
- JWT authentication
- Multer-based uploads
- Cloudinary and Cloudflare R2 support
- Nodemailer for contact/email workflows
- Supabase SDK integration

## Project structure

- client/ — public portfolio site and admin dashboard UI
- server/ — Express API, MongoDB models, validation, and upload services
- server/src/routes/ — API route definitions
- server/src/controllers/ — request handlers
- server/src/models/ — Mongoose schemas
- server/src/validations/ — request validation rules

## Key features

- Public portfolio landing page with project showcase and project details view
- Secure admin authentication and protected dashboard routes
- CRUD management for:
  - profile
  - projects
  - skills
  - experience
  - achievements
  - certificates
  - certificate companies
  - site settings
- Contact form handling and message storage
- Dashboard and analytics-style endpoints
- File upload and media storage support

## Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm
- MongoDB connection URI
- Email provider credentials for contact/email features
- Supabase project credentials (required by the server)
- Optional: Cloudinary or Cloudflare R2 credentials for media storage

## Environment configuration

### Client

Create a .env file inside client/:

```env
VITE_API_URL=http://localhost:5000/api
```

### Server

Create a .env file inside server/:

```env
# Required
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=7d

# Supabase (required)
SUPABASE_URL=<your_supabase_project_url>
SUPABASE_SERVICE_ROLE_KEY=<supabase_service_role_key>
SUPABASE_BUCKET_NAME=<supabase_bucket_name>

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>

# Cloudflare R2 (optional)
R2_ACCOUNT_ID=<cloudflare_r2_account_id>
R2_ACCESS_KEY_ID=<cloudflare_r2_access_key_id>
R2_SECRET_ACCESS_KEY=<cloudflare_r2_secret_access_key>
R2_BUCKET_NAME=<r2_bucket_name>
R2_PUBLIC_URL=<r2_public_url>

# Email
EMAIL_USER=<email_username>
EMAIL_PASS=<email_password>
```

> Do not commit .env files to version control.

## Installation

Install dependencies separately for each app:

```bash
cd server
npm install

cd ../client
npm install
```

## Running locally

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend app:

```bash
cd client
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Seed the default admin user

The server includes a seed script that creates a default admin account:

```bash
cd server
npm run seed-admin
```

> Change the default password after your first login.

## API overview

The backend exposes routes under /api, including:

- /api/auth
- /api/profile
- /api/projects
- /api/skills
- /api/experience
- /api/achievements
- /api/certificates
- /api/certificate-companies
- /api/contact
- /api/upload
- /api/dashboard
- /api/settings

Health check:

```http
GET /api/health
```

## Notes

- The server validates the presence of PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, and the Supabase variables at startup.
- Choose Cloudinary or Cloudflare R2 for media storage if you want to use those integrations; they are optional but require credentials.
- The admin UI is available at /admin and the login page is /admin/login.

## License

MIT
