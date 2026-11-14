---
title: Delete Student
description: How deleting a student works (who may delete, the one-transaction steps, what gets removed) and its known gaps.
---

# Delete Student

Removes a student from one school, and deletes the account only when nothing else ties it to the platform. Code: C4CNYC/CT-26 (PRs #14 and #15), live since Nov 13, 2026, and tested in production that day.

## Entry Points
- **UI:** `Frontend/src/pages/manager/school/students/list.tsx`: Delete → `ConfirmDialog` → `useDeleteStudentMutation` (`Frontend/src/redux/services/manager/students-manager.ts`)
- **API:** `DELETE /manager/school/:school_id/student/:id` in `Backend/src/api/manager/school-student-manager-api/school-student-manager-api.controller.ts`
  - Roles: SuperAdmin, Admin, Owner, Manager
- **Logic:** `SchoolStudentsManagerService.deleteStudent(school_id, student_id, user_id)` in `Backend/src/modules/managers/school-students-manager/school-students-manager.service.ts`

## Who Can Delete
`ensureUserCanManageSchool(user_id, school_id)` decides:

| Caller | Schools they can act on |
|---|---|
| SuperAdmin | Any school |
| Owner, Admin | Their organization's schools |
| Manager | Their organization's schools that they teach (`users_schools`) |

- "Their organization" means `users.organizationId = schools.organizationId`.
- A caller without access, or a student who isn't in `:school_id`, gets 404 `student isn't in this school`. Nothing changes.

## Steps (one transaction)
1. Remove the student from this school's classes (`stuent_classes`).
2. Remove the student from the school (`student_schools`).
3. Stop and return `student removed from school` if anything else ties the account to the platform:
   - another school is left;
   - the account's role isn't `student` (staff accounts have student profiles too);
   - the account owns an organization.
4. Otherwise delete the `students` row and return `student deleted`.
   - `users.studentProfileId` is `ON DELETE CASCADE`, so the login is deleted too.

## What the Delete Removes
Foreign keys decide this. The rules below were read from production on Nov 13, 2026.
- **CASCADE from `students`:**
  - school links, class links and pending class requests;
  - lesson progress (`lesson-last-slide`), goals, projects and socials;
  - uploaded lesson files, and the discussion threads and replies on them;
  - course ratings and likes, assignment links, and reset-password rows.
- **CASCADE from `users`:**
  - auth tokens and access control;
  - teacher links (school, class mentor, lesson author);
  - invitations, environments, media, and courses the account owns.
- **SET NULL from `users`:** lessons, course units, assignments, lesson contents and invite-system rows the account created. They stay, with no creator.
- **NO ACTION:** `organization.ownerId`. Organization owners never reach the delete (step 3).

## Delete Rules in Code
- **Migrations:** `1766400444631-AddCascadeDeletes` and `1794600666000-CascadeStudentHistoryDeletes`.
  - They run when the backend starts (`app-init.ts` → `dataSource.runMigrations()`).
- **Entities:** they carry the same `onDelete` settings. Keep the two in sync, or `typeorm migration:generate` will undo the rules.

## Known Gaps
- **No email** is sent, by design.
- **Files in S3** (uploads, media) are left behind. Only database rows are deleted.
- **The UI** shows the same "deleted" message for both outcomes.
- **Teachers who signed up through `/auth/google-signup`** have no organization, so the access check returns 404 for them.
  - Cause: `AuthManagerService.registerWithGoogle` calls `register(dto)` without the tenant id.
  - Scale: 217 manager accounts as of Nov 13, 2026.
  - `/auth/google-signin` sets the organization correctly.
