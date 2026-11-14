---
title: API Integration
description: Frontend data fetching with RTK Query services in src/redux/services, the Axios client, and the Next.js API proxy routes.
---

# API Integration

## Data Fetching
RTK Query for API calls via Redux services

## API Services
`src/redux/services/`
- `auth.ts` - Authentication
- `manager.ts` - Management operations  
- `student-auth.ts` - Student authentication
- `tenant-configs.ts` - Multi-tenant configuration
- `feedback.ts` - User feedback
- `school-settings-manager.ts`

## HTTP Client
`src/utils/axios.ts` - Configured Axios instance

## API Routes (Backend Proxies)
- `/api/s3-upload.ts` - File uploads
- `/api/unsplash/[[...params]].ts` - Image search
- `/api/tinymce/[...file].ts` - Rich text editor assets
- `/api/jokes/[[...params]].ts` - External API proxy

## Data Flow
RTK Query handles caching, invalidation, and loading states
Services integrate with Redux store for state management