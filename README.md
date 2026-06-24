# Portfolio CMS

A full-stack portfolio content management system with a React + Vite frontend and an Express + TypeScript backend.

## Project structure

- client/ — React 19 app using Vite, Tailwind CSS, React Router, React Query, and file upload support.
- server/ — Express API with TypeScript, MongoDB, JWT authentication, Cloudinary/R2 uploads, email support, and data validation.

## What's new (latest changes)

- Supabase packages were added as an optional integration. A `SUPABASE_URL` environment variable may be present if you use Supabase services.
- Cloudflare R2 support: the server uses an S3-compatible client configured for R2 (see `R2_*` env vars).
- Cloudinary configuration remains available for image uploads; the `cloudinary` package is present.

## Key features

- Admin authentication and authorization
- Profile, projects, skills, experience, achievements, certificates, and settings management
- File uploading and asset storage support (Cloudinary or Cloudflare R2)
- Contact form API
- Dashboard and analytics endpoints
- Validation and centralized error handling

## Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm
- MongoDB connection URI (required for the server)
- Optional: Cloudinary or Cloudflare R2 account for media uploads
- Optional: Supabase project URL if using Supabase features
- Email provider credentials for contact/email features

## Environment configuration

### Client

Create a `.env` file inside `client/`:

VITE_API_URL=http://localhost:5000/api

### Server

Create a `.env` file inside `server/` with the following values (required values are listed first):

```
# Required
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=7d

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>

# Cloudflare R2 (optional - used via S3 client)
R2_ACCOUNT_ID=<cloudflare_r2_account_id>
R2_ACCESS_KEY_ID=<cloudflare_r2_access_key_id>
R2_SECRET_ACCESS_KEY=<cloudflare_r2_secret_access_key>
R2_BUCKET_NAME=<r2_bucket_name>
R2_PUBLIC_URL=<r2_public_url>

# Email
EMAIL_USER=<email_username>
EMAIL_PASS=<email_password>

# Supabase
SUPABASE_URL=<your_supabase_project_url>
SUPABASE_SERVICE_ROLE_KEY=<supabase_service_role_key>
SUPABASE_BUCKET_NAME=<supabase_bucket_name>
```

> Do not commit `.env` files to version control.

## Installation

Install dependencies separately for each package.

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

## Build

To build the client for production:

```bash
cd client
npm run build
```

## Server utilities

- `npm run seed-admin` — seed an admin user into the database

## API

The backend exposes routes under `/api` such as:

- `/api/auth`
- `/api/profile`
- `/api/projects`
- `/api/skills`
- `/api/experience`
- `/api/achievements`
- `/api/certificates`
- `/api/contact`
- `/api/upload`
- `/api/dashboard`
- `/api/settings`

Health check endpoint:

```
GET /api/health
```

## Notes

- The server validates the presence of `PORT`, `MONGODB_URI`, `JWT_SECRET`, and `JWT_EXPIRES_IN` at startup; ensure they are set.
- Choose either Cloudinary or Cloudflare R2 for media storage; both are optional but require credentials.
- Supabase packages are installed in `server/node_modules` and can be wired up if you plan to use Supabase features — the repo does not currently include an active Supabase client in server code.

## License

MIT
