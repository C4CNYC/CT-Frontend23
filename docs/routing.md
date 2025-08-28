# Routing

## Pages Directory Structure
Next.js pages directory `/pages`

## Route Organization
- `/pages/index.tsx`
- `/pages/auth/`
- `/pages/student/`
- `/pages/manager/`
- `/pages/api/`
- `/pages/lesson/[lesson].tsx`
- `/pages/gallery-public/[id].tsx`

## Dynamic Routes
- `[id].tsx` - Single parameter
- `[[...params]].tsx` - Optional catch-all
- `/student/courses/[id]/[unit].tsx` - Nested dynamic

## API Routes
- `/api/s3-upload.ts`
- `/api/unsplash/[[...params]].ts`
- `/api/tinymce/[...file].ts`
- `/api/jokes/[[...params]].ts`

## Protected Routes
- `src/auth/AuthGuard.tsx`
- `src/auth/RoleBasedGuard.tsx`
- Role checks in `src/auth/JwtContext.tsx:116-122`