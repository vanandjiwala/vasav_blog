# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio/blog website built with Next.js 16, React 19, and Tailwind CSS 4. The site showcases Vasav Anandjiwala's work as a Senior Data Engineer with a focus on data platforms, analytics, and AI.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server (run after build)
npm start

# Run ESLint
npm run lint
```

## Architecture

### Framework & Routing
- **Next.js 16** with App Router (not Pages Router)
- Uses the `app/` directory structure for file-based routing
- Server Components by default; Client Components marked with `'use client'` directive

### Styling
- **Tailwind CSS 4** with PostCSS
- Custom theme configuration using CSS variables in `app/globals.css`
- shadcn/ui components configured with "new-york" style
- Uses `cn()` utility from `lib/utils.ts` for conditional class merging

### UI Components
- **shadcn/ui** components in `components/ui/`
- Custom block components in `components/blocks/`
- Configuration in `components.json` with path aliases:
  - `@/components` → components directory
  - `@/lib` → lib directory
  - `@/utils` → lib/utils
  - `@/ui` → components/ui

### Key Dependencies
- **Framer Motion** (`framer-motion`, `motion`) - animations
- **Lucide React** - icons
- **react-icons** - additional icon sets (Si* icons from Simple Icons)
- **Radix UI** - unstyled accessible primitives
- **class-variance-authority** - variant handling

## Path Aliases

TypeScript paths are configured in `tsconfig.json`:
- `@/*` maps to the root directory

This means imports should use:
```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## Component Patterns

### Hero Section Example
The main hero section (`components/blocks/hero-section-4.tsx`) demonstrates:
- Client component with state management for mobile menu
- Integration of custom UI components (InfiniteSlider, ProgressiveBlur)
- Responsive design with Tailwind breakpoints
- Social media links to LinkedIn, GitHub, Instagram, and Substack

### Adding shadcn/ui Components
```bash
# Add a specific component (auto-approved command)
npx shadcn@latest add [component-name]

# Initialize shadcn/ui (auto-approved)
npx shadcn@latest init
```

## Fonts

The project uses Geist font family:
- **Geist Sans** - primary sans-serif font
- **Geist Mono** - monospace font
- Loaded via `next/font/google` in `app/layout.tsx`
- CSS variables: `--font-geist-sans` and `--font-geist-mono`

## Static Assets

Public assets are in `public/` directory and referenced from root path:
```typescript
src="/image.png"  // references public/image.png
```

## Git Workflow

- Main branch: `master`
- Current working branch: `2-migrate-blog-to-next-js-based-application`
- Active migration from previous blog implementation to Next.js

## TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- JSX runtime: react-jsx (automatic JSX transform, no need to import React)
- Module resolution: bundler (Next.js optimized)
