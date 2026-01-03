# Glenda Macatangay Portfolio & Book Website

## Overview

This is a personal portfolio and book promotion website for author Glenda Macatangay, featuring her book "Salt in Her Lungs." The site includes pages for the book, tour dates, speaking engagements, consulting services, about information, and a contact form. It's built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for scroll reveals and transitions
- **State Management**: TanStack React Query for server state
- **Fonts**: Apercu (custom font family loaded via @font-face), Montserrat, and Playfair Display from Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx
- **API Structure**: RESTful endpoints under `/api/*`
- **Build Tool**: Vite for frontend, esbuild for server bundling

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Tables**: 
  - `contacts` - stores contact form submissions
  - `tourDates` - stores tour event information
  - `pageContent` - stores editable page content by key
  - `testimonials` - stores testimonials with placement options (home, book, consulting)

### Admin Backend
- **Access**: `/admin/login` with session-based authentication
- **Credentials**: Stored in environment variables (ADMIN_USERNAME, ADMIN_PASSWORD)
- **Dashboard Sections**:
  - Tour Dates: CRUD management for tour events
  - Page Content: Edit text content across pages
  - Testimonials: Manage testimonials with placement options (Home, Book, Consulting)
  - Contact Submissions: View contact form submissions

### Project Structure
- `client/` - React frontend application
- `server/` - Express backend
- `shared/` - Shared types and database schema
- `attached_assets/` - Static assets like images and branding files

### Key Design Patterns
- **Monorepo structure** with shared code between frontend and backend
- **Path aliases**: `@/` for client source, `@shared/` for shared code, `@assets/` for attached assets
- **API pattern**: All API routes return JSON, validation via Zod schemas derived from Drizzle
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: Static files served from `dist/public`, server bundled to `dist/index.cjs`

## External Dependencies

### Database
- PostgreSQL via `pg` driver
- Connection string from `DATABASE_URL` environment variable
- Session storage via `connect-pg-simple`

### UI/Animation Libraries
- Radix UI primitives (accordion, dialog, dropdown, etc.)
- Framer Motion for animations
- Embla Carousel for carousels
- Lucide React for icons

### Development Tools
- Vite with React plugin
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Drizzle Kit for database migrations (`npm run db:push`)
- Custom Vite plugins for Replit integration (cartographer, dev-banner, meta-images)