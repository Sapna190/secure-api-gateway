# Secure API Gateway

This repository contains a secure API gateway, a backend service, a web dashboard, and an ML helper service. The README below provides clear, submission-ready instructions for setup, running, and testing the project.

## Repository layout

- `gateway/` — API gateway implemented in TypeScript + Express.
- `backend-service/` — Supporting backend API (TypeScript + Express).
- `dashboard/` — Admin dashboard built with Next.js and Tailwind.
- `ml-service/` — Python ML helpers used for analysis or detection tasks.

---

## Project description

This project demonstrates a secure API gateway architecture that routes and protects requests to downstream services. Key responsibilities and features include:

- Authentication: supports JWT-based user authentication and API keys for service-to-service access.
- Authorization: role-based access for admin and developer users (used by dashboard and admin routes).
- Rate limiting and abuse protection: per-client throttling and blocklist support (backed by Redis).
- Threat detection: request inspection and scoring to flag or block suspicious requests; an ML helper service (`ml-service/`) can be used to assist detection.
- Centralized logging: request and incident logs are stored to help auditing and debugging; the dashboard surfaces these logs and metrics.
- Proxying and routing: the gateway forwards allowed requests to backend services and applies security checks on the way.

Technology highlights:

- Gateway: TypeScript + Express
- Backend: TypeScript + Express (+ Mongoose/DB where applicable)
- Dashboard: Next.js (React) + Tailwind CSS
- Caching / rate-limiter storage: Redis
- Optional ML: Python service for anomaly detection

This README gives the steps to run individual services locally for development or to prepare the repository for submission.

## Prerequisites

- Node.js 14 or later
- npm (or yarn/pnpm)
- Docker & Docker Compose (recommended for local databases and Redis)

---

## Setup and run (recommended)

1. Prepare environment files for the services you want to run. Example:

   - `gateway/.env.example` → `gateway/.env`
   - `dashboard/.env.example` → `dashboard/.env`

   Provide secrets and URLs such as `JWT_SECRET`, `DB_URL` (or `MONGODB_URI` / `POSTGRESQL_URI`), and `REDIS_URL`.

2. Start infrastructure via Docker Compose (optional but recommended):

   ```cmd
   cd /d "secure-api-gateway"
   docker-compose up -d
   ```

3. Install dependencies and run the desired service.

   Gateway (development):
   ```cmd
   cd /d "gateway"
   npm install
   npm run dev
   ```

   Backend service:
   ```cmd
   cd /d "backend-service"
   npm install
   npm run dev
   ```

   Dashboard:
   ```cmd
   cd /d "dashboard"
   npm install
   npm run dev
   ```

4. Build TypeScript projects when needed:

   ```cmd
   cd /d "gateway"
   set NODE_OPTIONS=--max-old-space-size=4096
   npm run build
   ```

---

## Running tests

Run tests for the gateway service:

```cmd
cd /d "gateway"
npm test
```

If tests need supporting services (database/Redis), start them with Docker Compose before running the test suite.

---

## Final notes

- Keep local secrets (`.env`) out of version control.


