# Copilot Instructions

These instructions apply to every Copilot session in this workspace.

## Stack

- **Runtime**: React 19 + TypeScript
- **UI library**: MUI (Material UI) **v7** — always follow v7 API conventions
- **Build**: Vite
- **Testing**: Vitest

## MUI v7 — Required Practices

### slotProps over deprecated direct props

MUI v7 replaced most `*Props` / `*Component` direct props with `slots` and `slotProps`.
Always use the modern API; never generate deprecated props.

| Deprecated           | Modern v7 equivalent                  |
|----------------------|---------------------------------------|
| `PaperProps`         | `slotProps={{ paper: { ... } }}`      |
| `BackdropProps`      | `slotProps={{ backdrop: { ... } }}`   |
| `TransitionProps`    | `slotProps={{ transition: { ... } }}` |
| `InputProps`         | `slotProps={{ input: { ... } }}`      |
| `InputLabelProps`    | `slotProps={{ inputLabel: { ... } }}` |
| `SelectDisplayProps` | `slotProps={{ select: { ... } }}`     |
| `componentsProps`    | `slotProps`                           |
| `components`         | `slots`                               |

**SpeedDialAction** (all direct tooltip props removed in v7):

| Deprecated                      | Modern v7 equivalent                             |
|---------------------------------|--------------------------------------------------|
| `tooltipTitle`                  | `slotProps={{ tooltip: { title: '...' } }}`      |
| `tooltipOpen`                   | `slotProps={{ tooltip: { open: true } }}`        |
| `tooltipPlacement`              | `slotProps={{ tooltip: { placement: 'left' } }}` |
| `FabProps` (on SpeedDialAction) | `slotProps={{ fab: { ... } }}`                   |
| `TooltipClasses`                | `slotProps={{ tooltip: { classes: { ... } } }}`  |

> **Note:** `SpeedDial.FabProps` (on the parent SpeedDial, not SpeedDialAction) is NOT deprecated.

### sx over inline styles

Always use the `sx` prop for styling MUI components. Never use inline `style={{}}` on MUI components.

### Theme-aware tokens

Prefer MUI system tokens inside `sx`:

```tsx
// ✅ Good
sx={{ color: 'primary.main', mt: 2, p: 1 }}

// ❌ Avoid
sx={{ color: '#1976d2', marginTop: '16px', padding: '8px' }}
```

## React Best Practices

- **Functional components only** — never class components
- **Named exports** — `export const MyComponent = () => { ... }` (project convention; default exports are fine when required by frameworks like Next.js or React.lazy)
- **Hooks** — prefer `useState`, `useReducer`, `useMemo`, `useCallback` as appropriate
- **Immutability** — never mutate state directly; always spread/copy before updating (`setState(prev => ({ ...prev, key: value }))`)
- **Dependency arrays** — always list all dependencies in `useEffect`, `useMemo`, `useCallback`; never suppress the exhaustive-deps lint rule
- **Destructure props** in the function signature
- **Avoid unnecessary state** — derive values where possible instead of storing in state
- **Keys** — use meaningful, stable keys on mapped lists; avoid array index as key on dynamic or reorderable lists (index is acceptable for static, never-reordered lists)
- **Event handlers** — prefix with `handle` in the component, `on` in the prop name
- **Accessibility** — use semantic HTML elements, provide ARIA attributes where needed, ensure keyboard navigation works
- **Performance** — avoid creating new objects, arrays, or functions inside render unless memoised when passed as props to child components

## TypeScript Best Practices

- **Strict mode** — do not ignore or suppress TypeScript errors with `// @ts-ignore` or `any`
- **`as const`** — use const assertions when TypeScript would widen literals to `string` / `number` (e.g. arrays passed to typed props, config objects)
- **Union types** — prefer `type Anchor = 'left' | 'right'` over `enum` (better tree-shaking, simpler)
- **Generics** — type `useState<T>` explicitly when the initial value doesn't reveal the full type
- **Interfaces for props** — project convention: prefer `interface` for component prop shapes, `type` for unions and utility types (both work identically; consistency matters more than the choice)

## Clean Code Principles

### Single Responsibility (SRP)

- Each component, hook, or utility should have **one reason to change**
- If a component handles UI + data fetching + validation, split them:
  - UI → presentational component
  - Data → custom hook (`useSomething`)
  - Validation → utility function

### DRY — Don't Repeat Yourself

- Extract shared logic into **custom hooks** or **utility functions**
- Extract repeated UI patterns into reusable components
- Every piece of knowledge should have a single, unambiguous representation

### KISS — Keep It Simple

- Prefer the simplest solution that works
- Don't add abstractions until complexity demands it
- Extract complex boolean expressions into well-named variables or helpers:

```tsx
// ❌ Avoid
if (user && user.isActive && user.role === 'admin' && items.length > 0) { ... }

// ✅ Prefer
const canProceed = user?.isActive && user.role === 'admin' && items.length > 0
if (canProceed) { ... }
```

### YAGNI — You Aren't Gonna Need It

- Don't add features, props, or abstractions until they are actually needed
- Avoid speculative generality — build for today's requirements

### Boy Scout Rule

- Always leave the code cleaner than you found it
- When touching existing code: improve naming, remove dead code, fix minor issues
- Keep refactoring separate from feature changes when possible

### Meaningful Names

- Use **descriptive, pronounceable, searchable** names
- Avoid single-letter variables except in short lambdas (`(x) => x.id`)
- Use **consistent vocabulary** — pick one word per concept (e.g. always `fetch`, not sometimes `get` and sometimes `retrieve`)
- Add meaningful context when needed (`userCount` not just `count`)

### Small Functions

- Aim for **10–20 lines** per function as a guideline — readability matters more than a hard line count; a clear 30-line function beats three artificially split 10-line ones
- Each function should operate at a **single level of abstraction**
- Prefer **few parameters** (0–2); use an options object when a function needs many — but don't force it when the API is naturally multi-param (e.g. event handlers)
- Avoid flag/boolean arguments that change function behaviour — split into two functions instead

### Comments

- Write **self-documenting code** — comments should explain **why**, not **what**
- **Good**: legal notices, explaining complex algorithms, TODO with context, non-obvious prop usage
- **Bad**: redundant comments that repeat the code, commented-out code (use version control), misleading or outdated comments

### Error Handling

- **Never fail silently** — either throw an error or return a typed `T | null` / `T | undefined` so callers handle it explicitly
- In components: throwing in render triggers React error boundaries (good for unrecoverable errors)
- In utility functions: returning `null` with proper types is often better than forcing try/catch at every call site
- Provide meaningful context in error messages
- Handle errors at the appropriate boundary (error boundaries for UI, try/catch for async)

### Low Cyclomatic Complexity

- Use **guard clauses / early returns** to reduce nesting
- Extract complex conditions into well-named helper functions
- Avoid nested loops — use `.map()`, `.filter()`, `.reduce()` or extract into helpers
- Aim for **no more than 2 levels of indentation** inside a function body

### Separation of Concerns

- **Components** — rendering and UI interaction
- **Custom hooks** — state logic, side effects, data fetching
- **Utility functions** — pure transformations, formatting, validation
- **Constants / config** — magic numbers, URLs, feature flags

### Testing (Test Pyramid)

- Favour **unit tests** (fast, many) over integration tests (moderate) over E2E tests (few)
- Each test should follow **Arrange → Act → Assert**
- Test behaviour, not implementation details

## Code Style

- Clean, idiomatic, self-documenting code
- **No semicolons** (the projects use no-semicolons style)
- **Single quotes** for strings
- Descriptive variable and function names — avoid abbreviations unless widely known
- Inline comments should explain **why**, not **what** — the code itself shows what
- Avoid deeply nested ternaries — extract into variables or helper functions
- Prefer early returns over deep if/else nesting
- Keep components under ~200 lines; extract sub-components or helpers when larger
- Use consistent formatting — rely on automatic formatters (Prettier, ESLint)
- Group related code together; separate unrelated code with blank lines

## General

- When multiple independent edits are needed, batch them where possible
- Always check for compile errors after edits
- Prefer reading enough context before editing — don't guess file structure
