# Components

This directory follows the Atomic Design methodology for organizing React components.

## Structure

- `atoms/` - Basic building blocks (buttons, inputs, labels, etc.)
- `molecules/` - Simple combinations of atoms (form groups, search bars, etc.)
- `organisms/` - Complex combinations of molecules and atoms (headers, forms, etc.)
- `forms/` - Form-specific components and form-related utilities
- `modals/` - Modal and dialog components

## Guidelines

1. Each component should be in its own directory with:
   - `index.tsx` - Main component file
   - `styles.ts` - Component-specific styles
   - `types.ts` - TypeScript interfaces and types
   - `README.md` - Component documentation

2. Use the theme system for consistent styling:
   ```typescript
   import { colors, spacing, typography } from '../../theme';
   ```

3. Add JSDoc comments for component props and complex logic:
   ```typescript
   /**
    * Button component with various styles and states
    * @param {ButtonProps} props - Component props
    * @returns {JSX.Element} Rendered button
    */
   ```

4. Keep components focused and single-responsibility
5. Use TypeScript for all components
6. Follow the project's ESLint and Prettier rules 