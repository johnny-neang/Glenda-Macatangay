# Claude Documentation - Glenda Macatangay Portfolio Website

> This documentation provides Claude (AI assistant) with comprehensive knowledge about this codebase to ensure consistent, informed development.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Pages & Components](#pages--components)
7. [Styling Guide](#styling-guide)
8. [Environment Variables](#environment-variables)
9. [Replit Deployment](#replit-deployment)
10. [Development Workflow](#development-workflow)

---

## Project Overview

**Glenda Macatangay's Personal Portfolio and Book Website** - A full-stack TypeScript application promoting her book "Salt in Her Lungs," speaking engagements, consulting services, and SALTY Tour events.

### Key Features
- Responsive public website with 8 pages
- Complete CMS admin dashboard for content management
- Tour dates management system
- Testimonials with multi-section placement
- Contact form with email notifications
- Newsletter signup integration

### Hosting
- **Platform**: Replit
- **Database**: PostgreSQL 16 (Replit-provisioned)
- **Deployment**: Auto-scaling via Replit

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| TypeScript | 5.6.3 | Type safety |
| Vite | 7.1.9 | Build tool |
| Wouter | 3.3.5 | Client-side routing |
| Tailwind CSS | v4 | Styling |
| shadcn/ui | - | Component library (New York variant) |
| Framer Motion | 12.23.24 | Animations |
| TanStack React Query | 5.60.5 | Data fetching |
| React Hook Form | 7.66.0 | Form handling |
| Zod | 3.25.76 | Validation |
| Lucide React | 0.545.0 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20 | Runtime |
| Express.js | 4.21.2 | Server framework |
| Drizzle ORM | 0.39.3 | Database ORM |
| express-session | 1.18.1 | Session management |
| connect-pg-simple | 10.0.0 | PostgreSQL session store |
| Mailjet | 6.0.11 | Email service |
| esbuild | 0.25.0 | Production bundling |

### Fonts
- **Apercu** (custom): 300, 400, 500, 700 weights - Primary sans-serif
- **Playfair Display** (Google): Headings/serif
- **Montserrat** (Google): Accent text

---

## Directory Structure

```
/
├── client/                      # React frontend
│   ├── src/
│   │   ├── App.tsx             # Main router (Wouter)
│   │   ├── main.tsx            # React entry point
│   │   ├── index.css           # Tailwind + custom styles
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx  # Responsive nav
│   │   │   │   └── Footer.tsx  # Newsletter signup
│   │   │   └── ui/             # shadcn/ui components (40+)
│   │   ├── pages/
│   │   │   ├── Home.tsx        # Homepage
│   │   │   ├── Book.tsx        # Book promotion
│   │   │   ├── Tour.tsx        # Tour dates
│   │   │   ├── Speaking.tsx    # Speaking page
│   │   │   ├── Consulting.tsx  # Consulting services
│   │   │   ├── About.tsx       # Biography
│   │   │   ├── Contact.tsx     # Contact form
│   │   │   ├── Privacy.tsx     # Privacy policy
│   │   │   ├── Acknowledgement.tsx
│   │   │   └── admin/
│   │   │       ├── Login.tsx   # Admin login
│   │   │       └── Dashboard.tsx # CMS dashboard
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx  # Mobile detection
│   │   │   └── use-toast.ts    # Toast notifications
│   │   └── lib/
│   │       ├── queryClient.ts  # React Query config
│   │       └── utils.ts        # cn() helper
│   ├── public/
│   │   └── fonts/              # Apercu font files
│   └── index.html
│
├── server/                      # Express backend
│   ├── index.ts                # App setup & middleware
│   ├── routes.ts               # API endpoints
│   ├── db.ts                   # PostgreSQL connection
│   ├── storage.ts              # Data access layer
│   ├── static.ts               # Static file serving
│   └── vite.ts                 # Dev server HMR
│
├── shared/                      # Shared code
│   └── schema.ts               # Drizzle schema + Zod
│
├── script/
│   └── build.ts                # Build script
│
├── attached_assets/            # Media files
│   ├── *.jpg, *.png           # Product images
│   └── Apercu_*.otf, *.ttf    # Font files
│
├── Configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── drizzle.config.ts
│   ├── components.json         # shadcn/ui config
│   ├── postcss.config.js
│   └── .replit                 # Replit config
```

---

## Database Schema

### PostgreSQL Tables

#### `contacts`
```typescript
{
  id: serial (PK),
  name: text (required),
  email: text (required),
  inquiryType: text (required),  // "Speaking Engagement", "Host Tour", "Consulting", "General"
  message: text (required),
  createdAt: timestamp (default: now)
}
```

#### `tourDates`
```typescript
{
  id: serial (PK),
  city: text (required),
  state: text (nullable),
  venue: text (nullable),
  date: text (required),        // e.g., "March 15, 2026"
  time: text (nullable),        // e.g., "7:00 PM"
  rsvpLink: text (nullable),
  description: text (nullable)  // Event type badge
}
```

#### `pageContent`
```typescript
{
  id: serial (PK),
  pageKey: text (unique, required),  // e.g., "home_hero", "book_description"
  content: text (required),
  updatedAt: timestamp (default: now)
}
```

**Available pageKeys:**
- `home_hero`, `home_intro`
- `book_description`, `book_endorsements`
- `tour_intro`
- `speaking_intro`, `speaking_talks`
- `consulting_intro`, `consulting_testimonials`
- `about_bio`
- `privacy_policy`
- `acknowledgement`

#### `testimonials`
```typescript
{
  id: serial (PK),
  name: text (required),
  title: text (nullable),       // Credential/affiliation
  quote: text (required),
  placement: text[] (required), // ["home", "book", "consulting"]
  sortOrder: integer (default: 0)
}
```

#### `session` (auto-created by connect-pg-simple)
```typescript
{
  sid: varchar (session ID),
  sess: json (session data),
  expire: timestamp
}
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/login` | - | Login with username/password |
| POST | `/api/admin/logout` | Admin | Destroy session |
| GET | `/api/admin/check` | - | Check if authenticated |

### Contacts
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/contacts` | Admin | List all submissions |
| POST | `/api/contacts` | - | Submit contact form (sends email) |

### Newsletter (Mailchimp)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/newsletter/subscribe` | - | Subscribe to newsletter |

**Request body:**
```json
{
  "email": "user@example.com",     // Required
  "firstName": "John",             // Optional
  "lastName": "Doe",               // Optional
  "birthday": "01/15"              // Optional, MM/DD format
}
```

### Tour Dates
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/tour-dates` | - | List all tour dates |
| POST | `/api/tour-dates` | Admin | Create tour date |
| PUT | `/api/tour-dates/:id` | Admin | Update tour date |
| DELETE | `/api/tour-dates/:id` | Admin | Delete tour date |

### Page Content
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/content/:pageKey` | - | Get content by key |
| GET | `/api/content` | Admin | List all content |
| PUT | `/api/content/:pageKey` | Admin | Upsert content |

### Testimonials
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/testimonials` | - | List all (sorted by sortOrder) |
| GET | `/api/testimonials/placement/:placement` | - | Filter by placement |
| POST | `/api/testimonials` | Admin | Create testimonial |
| PUT | `/api/testimonials/:id` | Admin | Update testimonial |
| DELETE | `/api/testimonials/:id` | Admin | Delete testimonial |

---

## Pages & Components

### Public Pages

| Route | Component | Key Features |
|-------|-----------|--------------|
| `/` | Home.tsx | Hero, explore grid, testimonials |
| `/book` | Book.tsx | Book info, testimonials, pre-order |
| `/tour` | Tour.tsx | Tour dates table, gallery |
| `/speaking` | Speaking.tsx | Talks, audiences, CTA |
| `/consulting` | Consulting.tsx | Services, testimonials |
| `/about` | About.tsx | Biography with photo |
| `/contact` | Contact.tsx | Contact form |
| `/privacy` | Privacy.tsx | Privacy policy |
| `/acknowledgement` | Acknowledgement.tsx | Land acknowledgement |

### Admin Pages

| Route | Component | Features |
|-------|-----------|----------|
| `/admin/login` | Login.tsx | Login form |
| `/admin` | Dashboard.tsx | 4-tab CMS: Tour Dates, Content, Testimonials, Contacts |

### Layout Components

**Navbar.tsx**
- Fixed positioning
- Mobile hamburger menu (hidden at md:)
- Links: Home, Book, Tour, Speaking, Consulting, About, Contact
- Pre-Order CTA button

**Footer.tsx**
- Newsletter signup form (first name, last name, email, birthday)
- Social links: Instagram, Substack
- Site links: Privacy, Acknowledgement
- Copyright 2026

### Animation Components

**ScrollReveal** wrapper for fade-in animations:
```tsx
<ScrollReveal>
  <div>Content fades in on scroll</div>
</ScrollReveal>
```

**StaggerContainer** for sequential child animations.

---

## Styling Guide

### Design System

#### Colors (CSS Variables)
```css
/* Light Mode (Default) */
--background: #C0CBC4;        /* Sage green */
--foreground: #13131E;        /* Dark navy */
--primary: #1918C8;           /* Bright blue */
--secondary: #212633;         /* Dark gray */
--muted: #AFB8B8;             /* Light gray */
--accent: #1918C8;            /* Same as primary */

/* Dark Mode */
/* Inverted backgrounds with same accent colors */
```

#### Typography
```css
/* Sans-serif (body text) */
font-family: 'Apercu', sans-serif;

/* Serif (h1 headings) */
font-family: 'Playfair Display', serif;

/* Accent text */
font-family: 'Montserrat', sans-serif;
```

#### Spacing & Borders
- **Border radius**: 0 (no rounding throughout)
- **Container max-width**: Use Tailwind's `max-w-6xl`, `max-w-4xl`
- **Section padding**: `py-16 md:py-24`

### Common Patterns

**Page Container:**
```tsx
<div className="min-h-screen">
  <Navbar />
  <main className="pt-24">
    <div className="container mx-auto px-4 md:px-8">
      {/* Content */}
    </div>
  </main>
  <Footer />
</div>
```

**Section Headings:**
```tsx
<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
  Title
</h1>
<h2 className="text-2xl md:text-3xl font-medium">
  Subtitle
</h2>
```

**Buttons:**
```tsx
// Primary CTA
<Button className="bg-primary text-white px-8 py-4">
  Action
</Button>

// Outline/Secondary
<Button variant="outline" className="border-foreground">
  Secondary
</Button>
```

**Grid Layouts:**
```tsx
// 4-column explore grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

// 2-column content
<div className="grid md:grid-cols-2 gap-12">

// 3-column gallery
<div className="grid grid-cols-3 gap-4">
```

**Image Aspect Ratios:**
```tsx
<div className="aspect-[3/4]">  {/* Portrait */}
<div className="aspect-[4/3]">  {/* Landscape */}
<div className="aspect-[4/5]">  {/* Tall portrait */}
```

### Responsive Breakpoints
- `sm:` - 640px
- `md:` - 768px (mobile menu breakpoint)
- `lg:` - 1024px
- `xl:` - 1280px

---

## Environment Variables

### Required
```bash
DATABASE_URL=postgresql://user:pass@host/dbname
NODE_ENV=development|production
PORT=5000
```

### Email (Mailjet)
```bash
MAILJET_API_KEY=<api-key>
MAILJET_SECRET_KEY=<secret>
MAILJET_FROM_EMAIL=noreply@glendamacatangay.com
```

### Newsletter (Mailchimp)
```bash
MAILCHIMP_API_KEY=<api-key>-<datacenter>  # e.g., xxxx-us14
MAILCHIMP_LIST_ID=<audience-list-id>      # Your Mailchimp audience ID
```

### Admin Credentials
```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<secure-password>
```

### Session
```bash
SESSION_SECRET=<random-string>
```

---

## Replit Deployment

### .replit Configuration
```toml
modules = ["nodejs-20", "web", "postgresql-16"]
run = "npm run dev"

[deployment]
deploymentTarget = "autoscale"
build = ["npm", "run", "build"]
run = ["node", "./dist/index.cjs"]
publicDir = "dist/public"
```

### Build Process
1. `npm run build` - Runs `script/build.ts`
2. Vite builds frontend to `dist/public/`
3. esbuild bundles server to `dist/index.cjs`

### Scripts
```json
{
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "tsx script/build.ts",
  "start": "NODE_ENV=production node dist/index.cjs",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

### Important Notes for Replit
1. **Never break the build** - Always test with `npm run build` before pushing
2. **Database migrations** - Use `npm run db:push` for schema changes
3. **Environment variables** - Set in Replit Secrets, not in code
4. **Port 5000** - Required for Replit's proxy
5. **Static files** - Served from `dist/public/` in production

---

## Development Workflow

### Adding a New Page
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Add navigation link in `Navbar.tsx` if needed
4. Follow existing page structure (Navbar, main, Footer)

### Adding API Endpoints
1. Define schema in `shared/schema.ts` if new table needed
2. Add storage methods in `server/storage.ts`
3. Add route handlers in `server/routes.ts`
4. Run `npm run db:push` for schema changes

### Adding Components
1. Use existing shadcn/ui components from `client/src/components/ui/`
2. For new shadcn components: `npx shadcn@latest add <component>`
3. Custom components go in `client/src/components/`

### Styling Guidelines
1. Use Tailwind utility classes
2. Follow existing color scheme (CSS variables)
3. Maintain 0 border-radius design
4. Use Framer Motion for animations
5. Test responsive at all breakpoints

### Data Fetching Pattern
```tsx
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Fetch
const { data, isLoading } = useQuery({
  queryKey: ["endpoint"],
  queryFn: () => fetch("/api/endpoint").then(r => r.json())
});

// Mutate
const mutation = useMutation({
  mutationFn: (data) => apiRequest("/api/endpoint", "POST", data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["endpoint"] })
});
```

---

## Key File Locations

| Purpose | Path |
|---------|------|
| Main server setup | `server/index.ts` |
| API routes | `server/routes.ts` |
| Database schema | `shared/schema.ts` |
| React router | `client/src/App.tsx` |
| Styles | `client/src/index.css` |
| Admin dashboard | `client/src/pages/admin/Dashboard.tsx` |
| Query client | `client/src/lib/queryClient.ts` |
| Vite config | `vite.config.ts` |
| Build script | `script/build.ts` |

---

## Maintenance Notes

### Security Considerations
- Admin credentials should be in Replit Secrets
- Never commit `.env` files
- Session cookies are httpOnly and secure in production

### Performance
- React Query caches API responses
- Images should be optimized before upload
- Static assets served with caching headers

### Backup
- Database is PostgreSQL - can be exported via Replit
- Code is version controlled in Git
- Media files in `attached_assets/`

---

*Last updated: January 2026*
*Documentation for Claude AI assistant development*
