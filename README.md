# CodeTribe Frontend

Next.js educational platform with multi-tenant architecture, code editor, and role-based access.

## Quick Navigation

- **[Routing](docs/routing.md)** - Pages structure, dynamic routes, API endpoints
- **[State Management](docs/state.md)** - Redux store, slices, context providers  
- **[Components](docs/components.md)** - UI components, sections, layouts
- **[API Integration](docs/api.md)** - RTK Query services, HTTP client
- **[Forms & Validation](docs/forms.md)** - Form components, Yup schemas
- **[Styling](docs/styling.md)** - Material-UI theme, overrides
- **[Helpers & Utils](docs/helpers.md)** - Utilities, custom hooks
- **[Configuration](docs/config.md)** - Multi-tenant configs, environment
- **[Authentication](docs/auth.md)** - JWT auth, role-based access
- **[Error Handling](docs/error-handling.md)** - Error pages, notifications

## Architecture

**Frontend**: Next.js 14 with TypeScript  
**State**: Redux Toolkit with RTK Query  
**UI**: Material-UI with custom theme  
**Auth**: JWT with role-based guards  
**Multi-tenant**: Static JSON configs  

## Development

```bash
yarn dev          # Start development server
yarn build        # Production build
yarn lint         # ESLint check
```

## Key Directories

- `src/pages/` - Next.js routes
- `src/components/` - Reusable UI components  
- `src/sections/` - Feature-specific components
- `src/redux/` - State management
- `src/auth/` - Authentication system
- `src/utils/` & `src/hooks/` - Utilities and custom hooks