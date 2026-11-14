# Authentication & Authorization

## Auth System
JWT-based authentication with role-based access control

## Auth Directory
`src/auth/`
- `JwtContext.tsx` - Auth provider with login/logout
- `AuthGuard.tsx` - Route protection
- `RoleBasedGuard.tsx` - Role-based access
- `OnlyAdmin.tsx` - Admin-only access

## Auth Forms
`src/sections/auth/`
- `sign-in/index.tsx` - Login form
- `AuthNewPasswordForm.tsx`, `AuthResetPasswordForm.tsx`
- `InviteForm.tsx`, `JoinCode.tsx`

## Authentication Methods
- Email/password login
- Google OAuth (`loginWithGoogle`, `registerWithGoogle`)
  - Uses `@react-oauth/google`, not Firebase. The OAuth client lives in Google Cloud; setup is in the private devops docs (`docs/devops/devops.md`, section 1.5).
- Tenant registration

## User Roles
- Student - Limited access
- Manager/Admin - Full dashboard access
- Role checks redirect unauthorized users

## Session Management
- Token stored in localStorage
- Auto-initialization on app load
- Session cleanup on logout