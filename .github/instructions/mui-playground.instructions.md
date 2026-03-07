---
applyTo: "react-mui-project/**"
---

# MUI Learning Playground

## Component Playground Pattern

When creating a new MUI component showcase file (e.g. `MuiButton.tsx`):

1. **Named export**: `export const MuiButton = () => { ... }`
2. **Top-level comment**: link to MUI docs + brief summary
3. **Layout**: `Stack spacing={4}` as outer wrapper
4. **Sections**: each demo in a `Box` with a `Typography variant="h6"` label and optional
   `variant="body2" color="text.secondary"` description
5. **Group by prop/feature**: one section per prop or behaviour being demonstrated
6. **Use MUI components** throughout (e.g. `Button` not `<button>`)
7. **Comments in code**: brief inline comments explaining non-obvious props
