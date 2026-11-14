---
title: Forms & Validation
description: React Hook Form with Yup, the RHF wrapper components in src/components/hook-form, and where the schemas are.
---

# Forms & Validation

## Form Library
React Hook Form with Yup validation

## Form Components
`src/components/hook-form/` - RHF wrapper components
- `FormProvider.tsx`, `RHFTextField.tsx`, `RHFSelect.tsx`, etc.

## Validation Schemas
Forms with Yup validation schemas:

### Authentication
- `src/sections/auth/AuthNewPasswordForm.tsx`
- `src/sections/auth/AuthResetPasswordForm.tsx`
- `src/sections/auth/sign-in/index.tsx`
- `src/sections/auth/InviteForm.tsx`

### User Management
- `src/sections/student-profile/ProfileEditForm.tsx`
- `src/sections/dashboard/user/UserNewEditForm.tsx`
- `src/sections/dashboard/student/StudentNewEditForm.tsx`

### Content Creation
- `src/sections/dashboard/lessons/CreateLessonDialog/CreateLessonDialog.tsx`
- `src/sections/dashboard/modules/CreateModuleDialog.tsx`
- `src/sections/dashboard/courses/create-course-dialog/constants.tsx`

### Organization Management
- `src/sections/administration/AddEditOrgModal.tsx`
- `src/sections/dashboard/schools/classes/CreateClassDialog.tsx`

## Custom Inputs
`src/components/custom-input/` - Custom form controls

## Validation Utilities
- `src/utils/CheckValidationTests.ts`
- `src/hooks/useValidationManager.ts`