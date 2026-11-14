---
title: State Management
description: The Redux Toolkit store, its slices, the RTK Query services and the React context providers.
---

# State Management

## Redux Toolkit
Main store: `src/redux/store.ts`

## Store Structure
- **Slices**: `src/redux/slices/`
  - `global.ts` - User state
  - `tenant.ts` - Multi-tenant config
  - `code-panel.ts` - Code editor state
  - `chat-handler.ts` - Chat functionality
  - `checkers-animation.ts` - UI animations

## RTK Query Services
- `src/redux/services/auth.ts`
- `src/redux/services/manager.ts`
- `src/redux/services/student-auth.ts`
- `src/redux/services/tenant-configs.ts`

## Context Providers
- `src/auth/JwtContext.tsx` - Authentication
- `src/components/settings/SettingsContext.tsx` - UI settings
- `src/sections/code-panel/lib/LessonManagerContext.tsx`
- `src/sections/code-panel/lib/CodePanelProgress.tsx`
- `src/sections/code-panel/lib/FullScreenContext.tsx`
- `src/sections/dashboard/gallery/context/gallery-context.tsx`
- `src/sections/dashboard/lessons/LessonStep/LessonContent.context.tsx`

## Usage
```ts
import { useSelector, useDispatch } from 'src/redux/store'
```