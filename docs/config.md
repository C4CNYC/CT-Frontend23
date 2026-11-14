---
title: Configuration
description: Tenant JSON configs in public/configs, how tenant config is fetched, the Next.js config and environment detection.
---

# Configuration

## Multi-tenant Configuration
Static JSON configs loaded from `/public/configs/`:
- `codetribe.config.json`
- `codejika.config.json` 
- `localhost.config.json`
- `dev1.config.json`, `stage1.config.json`

Configuration loaded via RTK Query:
- `src/redux/services/tenant-configs.ts` - Fetches tenant configs from static files
- Contains: `tenant`, `logoUrl`, `logoNormalUrl`

## Next.js Config
`next.config.js` - Bundle analyzer, image optimization, caching

## Environment Detection
Tenant determined by domain/localStorage in `src/auth/JwtContext.tsx:175-177`