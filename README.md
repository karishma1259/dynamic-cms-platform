# Dynamic CMS Platform

A full-stack Content Management System with a public website that consumes content dynamically from a custom-built backend.

## Live Links
- Public Website: https://dynamic-cms-frontend.onrender.com
- Admin Panel: https://dynamic-cms-frontend.onrender.com/admin/login
- Backend API: https://dynamic-cms-platform-4.onrender.com

## Admin Credentials
- Username: `admin`
- Password: `admin123`

## Tech Stack
- Frontend: Next.js (App Router), Redux Toolkit, Tailwind CSS
- Backend: Express.js, MongoDB (Mongoose)
- Auth: JWT (HttpOnly cookies)
- Infrastructure: Docker, Docker Compose

## Architecture Overview
- **Backend** exposes REST APIs under `/api/auth` and `/api/content`. Content is stored as a flexible block-based schema (`section`, `title`, `slug`, `status`, `blocks[]`) where each block has a `type` (heading, paragraph, list, table) and `data`, allowing rich, evolving content without schema changes.
- **Admin Panel** (`/admin/*`) is a protected area where authenticated admins can create, edit, and delete content. Content blocks are edited as JSON to support arbitrary rich structures (tables, lists, nested content) without building a full WYSIWYG editor, prioritizing flexibility given time constraints.
- **Public Website** fetches published content from the backend at runtime (`GET /api/content`) and renders it dynamically based on block type — no hardcoded content.
- **State Management**: Redux Toolkit manages auth state (logged-in user) and content list state; local component state is used for form inputs and loading states.

## Setup Instructions (Local)

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- Docker & Docker Compose (optional, for containerized run)

### Option 1: Run with Docker Compose
```bash
# create a .env file in project root with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret

docker-compose up --build
```
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Option 2: Run manually

**Backend**
```bash
cd backend
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run seed            # seeds admin user + sample content
npm run dev
```

**Frontend**
```bash
cd frontend
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL=http://localhost:5000
npm install
npm run dev
```

## Assumptions
- Content is modeled as reusable "blocks" (heading, paragraph, list, table) rather than a fixed schema per page section, to support rich/mixed content types without rebuilding APIs for each content shape.
- Admin content editing uses a JSON block editor rather than a full rich-text/WYSIWYG UI, given assignment time constraints — this still fully supports all required content types (long-form text, lists, nested lists via JSON, tables, mixed content).
- Single admin role; no multi-user roles/permissions implemented.
- MongoDB was chosen over a relational DB for its flexible document schema, well suited to block-based content that evolves over time.

## Seed Data
Running `npm run seed` in the backend creates:
- Admin user: `admin` / `admin123`
- Sample published content for `hero`, `about`, and `services` sections
