# School Management System - Mobile Application

## Overview

A mobile-first web application for managing school groups and students, built from a Figma design. The application provides functionality for creating and managing student groups, adding students, and organizing educational data. Currently implemented as a frontend-focused application with Redux state management, designed to be extended with backend persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component-Based React Application**
- Built with React 18.3 and TypeScript for type safety
- Uses a modular, page-based routing structure via Wouter (lightweight routing)
- Mobile-first design approach with responsive layouts
- Component library: shadcn/ui built on Radix UI primitives
- Styling: Tailwind CSS with custom design tokens from Figma

**State Management Strategy**
- Redux Toolkit for global application state
- Two primary domain slices: `groupsSlice` and `studentsSlice`
- Client-side only state (currently no backend persistence)
- Students and groups managed with relationship tracking (groups contain arrays of student IDs)

**Key Design Patterns**
- Separation of UI components (`client/src/components/ui/`) from page components (`client/src/pages/`)
- Reusable MobileHeader component for consistent navigation
- Custom hooks for common functionality (mobile detection, toast notifications)
- Type-safe Redux hooks (`useAppDispatch`, `useAppSelector`)

**Page Structure**
- `/` - Registration/onboarding screen
- `/groups` - List all groups with student counts
- `/groups/create` - Create new group form
- `/students` - List all students with their group memberships
- `/students/add` - Add new student form

### Backend Architecture

**Server Framework**
- Express.js 4.21 with TypeScript
- Currently minimal implementation with placeholder routes
- Vite dev server integration for development
- Production build uses esbuild for server bundling

**Data Layer Design**
- In-memory storage implementation (`MemStorage` class) as placeholder
- Interface-based storage pattern (`IStorage`) for future database implementation
- Prepared for Drizzle ORM integration with PostgreSQL

**Build System**
- Vite for frontend bundling and development server
- Hot Module Replacement (HMR) in development
- Separate client and server build outputs
- Client builds to `dist/public`, server to `dist`

### Shared Layer

**Type Definitions**
- Shared schema definitions in `shared/schema.ts`
- Drizzle schema for users table (prepared for database integration)
- Zod validation schemas using `drizzle-zod`
- Path aliases for clean imports (`@/`, `@shared/`, `@assets/`)

## External Dependencies

### Database (Prepared, Not Yet Connected)
- **PostgreSQL via Neon**: Serverless Postgres configured in `drizzle.config.ts`
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries
- Database URL expected via `DATABASE_URL` environment variable
- Migration files output to `./migrations` directory

### UI Component Libraries
- **Radix UI**: Accessible component primitives (accordion, dialog, dropdown, select, toast, etc.)
- **shadcn/ui**: Pre-built component system based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens

### State and Data Management
- **Redux Toolkit**: State management with slice pattern
- **TanStack Query (React Query)**: Async state management for server data (configured but not actively used)
- **React Hook Form**: Form state management
- **Zod**: Runtime type validation

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type checking across full stack
- **Replit Plugins**: Dev banner, cartographer, runtime error overlay
- **ESBuild**: Production server bundling

### Routing and Navigation
- **Wouter**: Lightweight client-side routing (alternative to React Router)

### Styling Assets
- Custom fonts: DM Sans, Architects Daughter, Fira Code, Geist Mono
- Figma design assets in `client/public/figmaAssets/`
- CSS custom properties for design system colors and typography
