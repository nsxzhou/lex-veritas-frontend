# Project Overview

**Project Name:** lex-veritas-frontend
**Purpose:** Frontend application for LexVeritas.

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4, PostCSS
- **UI Components:** Radix UI (primitives), Lucide React (icons)
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Utilities:** clsx, tailwind-merge, class-variance-authority

## Directory Structure
- `src/`: Source code
  - `components/`: UI components
    - `ui/`: Generic UI components (shadcn/ui style)
      - `avatar.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `input.tsx`, `scroll-area.tsx`, `select.tsx`, `separator.tsx`, `table.tsx`
  - `pages/`: Page components
  - `lib/`: Utility functions (`utils.ts` contains `cn` helper)
  - `assets/`: Static assets
- `public/`: Public static files
- `dist/`: Build output

## Key Configuration
- **Tailwind Config:** `src/index.css` (Tailwind v4 CSS-first config)
- **Theme:** HSL variables in `src/index.css` for light/dark modes.
