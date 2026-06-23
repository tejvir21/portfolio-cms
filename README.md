# Portfolio CMS

A full-stack portfolio content management system with a React + Vite frontend and an Express + TypeScript backend.

## Project structure

- `client/` — React 19 app using Vite, Tailwind CSS, React Router, React Query, and file upload support.
- `server/` — Express API with TypeScript, MongoDB, JWT authentication, Cloudinary/R2 uploads, email support, and data validation.

## Key features

- Admin authentication and authorization
- Profile, projects, skills, experience, achievements, certificates, and settings management
- File uploading and asset storage support
- Contact form API
- Dashboard and analytics endpoints
- Validation and centralized error handling

## Prerequisites

- Node.js 18+ (recommended Node 20+)
- npm
- MongoDB connection URI
- Cloudinary account or Cloudflare R2 for media uploads
- Email provider credentials for contact/email features

## Environment configuration

### Client

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Server

Create a `.env` file inside `server/` with the following values:

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>

EMAIL_USER=<email_username>
EMAIL_PASS=<email_password>

R2_ACCOUNT_ID=<cloudflare_r2_account_id>
R2_ACCESS_KEY_ID=<cloudflare_r2_access_key_id>
R2_SECRET_ACCESS_KEY=<cloudflare_r2_secret_access_key>
R2_BUCKET_NAME=<r2_bucket_name>
R2_PUBLIC_URL=<r2_public_url>
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

```http
GET /api/health
```

## Notes

- The backend requires MongoDB and valid authentication configuration.
- The frontend expects the API base URL set via `VITE_API_URL`.

## License

MIT
