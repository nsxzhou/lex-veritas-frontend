# Frontend Style Guidelines

## Core Technologies
- **Tailwind CSS v4**: Used for all styling.
- **Radix UI**: Used for accessible component primitives.
- **Lucide React**: Used for icons.

## Color System
The project uses HSL CSS variables for theming, supporting both light and dark modes.
Variables are defined in `src/index.css`.

### Semantic Colors
- **Background/Foreground**: `bg-background`, `text-foreground`
- **Primary**: `bg-primary`, `text-primary-foreground` (Main brand color)
- **Secondary**: `bg-secondary`, `text-secondary-foreground`
- **Muted**: `bg-muted`, `text-muted-foreground` (For less emphasized content)
- **Accent**: `bg-accent`, `text-accent-foreground` (For interactive elements like hover states)
- **Destructive**: `bg-destructive`, `text-destructive-foreground` (For error/delete actions)
- **Card**: `bg-card`, `text-card-foreground`
- **Popover**: `bg-popover`, `text-popover-foreground`
- **Border**: `border-border`
- **Input**: `border-input`
- **Ring**: `ring-ring` (Focus rings)

## Typography
- Fonts are likely inherited from the browser default or a specific font if configured in `index.html` (check if needed).
- Use Tailwind's utility classes for font sizes and weights.

## Spacing & Layout
- Use Tailwind's spacing scale (e.g., `p-4`, `m-2`, `gap-4`).
- **Border Radius**: The project uses a global radius variable `--radius: 0.5rem`. Use `rounded-lg`, `rounded-md`, `rounded-sm` which map to this variable.

## Component Construction
- **cn() Utility**: Use `clsx` and `tailwind-merge` (likely wrapped in a `cn` utility in `src/lib/utils.ts` or similar) to conditionally apply classes and merge Tailwind classes.
  ```typescript
  import { cn } from "@/lib/utils" // Verify path
  // Usage: className={cn("base-classes", className)}
  ```
- **Radix UI**: Wrap Radix primitives with custom styles to create reusable components.

## Dark Mode
- Dark mode is supported via the `.dark` class on the root element (or handled by a theme provider).
- Colors automatically switch based on the CSS variables.
