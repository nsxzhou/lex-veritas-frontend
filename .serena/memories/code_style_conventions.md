# Code Style & Conventions

## Linting & Formatting
- **ESLint**: Used for linting. Run `npm run lint`.
- **Prettier**: Likely used (implied by standard setups), but check for `.prettierrc`.
- **TypeScript**: Strict mode is likely enabled. Ensure all types are defined.

## Naming Conventions
- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`).
- **Hooks**: camelCase, start with `use` (e.g., `useTheme.ts`).
- **Utilities**: camelCase (e.g., `formatDate.ts`).
- **Variables/Functions**: camelCase.
- **Constants**: UPPER_CASE for global constants.

## Component Structure
- Use functional components with hooks.
- Props should be typed using interfaces or types.
- Export components as named exports or default exports (check existing files for consistency).

## File Organization
- Colocate related files if possible.
- Use `src/components/ui` for generic UI components (shadcn/ui style).
- Use `src/components` for feature-specific components.
- Use `src/pages` for route components.
