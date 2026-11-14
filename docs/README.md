---
title: Docs Index
description: How and when to add files to docs/, and a one-line index of every file in it.
---

# Docs

Start here. Read the index below, then open only the files you need. Legacy-platform docs (the old Firebase app) are in [../docs_legacy/](../docs_legacy/) and aren't listed here.

## Adding a File

**When**
- You built or changed a feature: add or update a file in `features/`.
- You're planning work that needs Jon's decisions or spans sessions: add a file in `_plans/`, and a row in [_plans/README.md](_plans/README.md), which tracks each plan's status and owner.
- You learned infrastructure facts (hosting, servers, domains, accounts): update `devops/devops.md`, or add a file beside it for a separate system, like `devops/wordpress.md`.
- The top-level files are the original frontend reference (Oct 2026). Update one when you change what it describes. Add a new one only for a new cross-cutting area.

**Who can see it**
- **Public:** the top-level files and `features/`, in the CT-Frontend23 repo. The top-level files are tracked, and `features/` isn't ignored. Never put secrets or open security holes there.
- **Private:** `_plans/` is excluded from git on this Mac (`.git/info/exclude`), and `devops/` is never committed. Credentials and security issues go there.
- **This index is public too.** Describe private files without secrets or security details.

**How**
1. One concern per file, with a short kebab-case name, such as `code-panel-preview.md`.
2. Start with front matter, then the `# Title`:
   ```markdown
   ---
   title: Code Panel – Preview and Run Modes
   description: One line saying what's in the file and when to read it.
   ---
   ```
   Keep each value on one line, without `": "` or `" #"`, so it parses both as YAML and by splitting at the first colon.
3. When the file describes code, say what it was checked against: the repo, the commit or branch, and the date.
4. Link to related files instead of repeating them.
5. Add a line to the index below, under the file's folder, with the same description as its front matter. Keep each section sorted by file name. When a file's description changes, change it here too.

## Index

### Features (`features/`, public)
How features work in the live code (C4CNYC/CT-26).
- [features/code-panel-preview.md](features/code-panel-preview.md) — How the code panel finds the lesson and its auto-run or manual mode, picks the preview, builds the HTML preview and decides when to redraw.
- [features/code-panel-python-java.md](features/code-panel-python-java.md) — How Python (MicroPython in the browser) and Java (Judge0 through n8n) lessons run against the lesson's tests, and how results reach the checks.
- [features/code-panel-student-files.md](features/code-panel-student-files.md) — Where the editor's code comes from (guest browser cache or a signed-in student's saved copy), carry-over, and why lesson edits don't reach returning students.
- [features/delete-student.md](features/delete-student.md) — How deleting a student works (who may delete, the one-transaction steps, what gets removed) and its known gaps.

### Frontend Reference (top level, public)
This repo's frontend code (CT-Frontend23 `src/`), written Oct 2026. CT-26 `Frontend/src/` has the same layout, but check the current code before relying on details.
- [api.md](api.md) — Frontend data fetching with RTK Query services in src/redux/services, the Axios client, and the Next.js API proxy routes.
- [auth.md](auth.md) — Frontend sign-in and roles, with the JWT context, auth and role guards, auth forms and session handling.
- [checkers.md](checkers.md) — Lesson checks that validate student code (regex checks and iframe signals), where their code lives and how they run.
- [components.md](components.md) — Where UI code lives (src/components, src/sections, src/layouts) and the main reusable components.
- [config.md](config.md) — Tenant JSON configs in public/configs, how tenant config is fetched, the Next.js config and environment detection.
- [error-handling.md](error-handling.md) — Error pages (403, 404, 500), RTK Query error handling, form validation errors and notifications.
- [forms.md](forms.md) — React Hook Form with Yup, the RHF wrapper components in src/components/hook-form, and where the schemas are.
- [helpers.md](helpers.md) — Utility functions in src/utils (time, numbers, strings, localStorage) and the custom hooks in src/hooks.
- [routing.md](routing.md) — Next.js pages-directory routes, dynamic routes, API routes and protected routes.
- [state.md](state.md) — The Redux Toolkit store, its slices, the RTK Query services and the React context providers.
- [styling.md](styling.md) — The MUI theme (palette, typography, shadows), component overrides, global styles and settings.

### DevOps (`devops/`, private, never commit)
- [devops/devops.md](devops/devops.md) — How the current platform fits together (tenants, GitHub, Netlify, the backend server, Google sign-in, domains, deploys) and its known issues.
- [devops/devops_creds.md](devops/devops_creds.md) — Credentials for the platform's services. Never commit it or paste from it.
- [devops/netlify-to-dokploy.md](devops/netlify-to-dokploy.md) — Runbook for moving the frontends off Netlify to Dokploy, starting with the first hour if Netlify is compromised.
- [devops/wordpress.md](devops/wordpress.md) — The marketing site on SiteGround (WordPress, JupiterX, Elementor), who holds access, plugins, DNS, forms and how to change it.

### Plans (`_plans/`, private)
- [_plans/README.md](_plans/README.md) — Index of current-platform plans in priority order, with each one's status and owner.
- [_plans/accounts-and-access.md](_plans/accounts-and-access.md) — Plan for 2FA on admin accounts and the right GitHub access for people and agents.
- [_plans/ai-lesson-agent.md](_plans/ai-lesson-agent.md) — Plan to replace n8n and the old AI paths with one Claude agent in the backend that builds lessons and edits slides.
- [_plans/backend-access.md](_plans/backend-access.md) — Plan to see and deploy the production backend, how Dokploy builds CT-26, and what's still open.
- [_plans/backend-auth-security.md](_plans/backend-auth-security.md) — Plan for backend login and access security fixes, with related findings.
- [_plans/cascade-deletes-and-delete-student.md](_plans/cascade-deletes-and-delete-student.md) — Plan to bring production's cascade-delete rules into CT-26 and make deleting a student safe.
- [_plans/class-page-access.md](_plans/class-page-access.md) — Plan to let teachers, admins and mentors open the class pages they're responsible for without joining as students.
- [_plans/codejika-merge.md](_plans/codejika-merge.md) — Plan to run app.codejika.org on the same setup as CodeTribe, with a comparison of the two frontend copies and progress so far.
- [_plans/codetribe-com-dns.md](_plans/codetribe-com-dns.md) — Proposal to manage codetribe.com's DNS outside SiteGround while the WordPress site stays there.
- [_plans/digitalocean-cleanup.md](_plans/digitalocean-cleanup.md) — Inventory of the DigitalOcean account and the removal of the OpenClaw droplet.
- [_plans/domain-cleanup.md](_plans/domain-cleanup.md) — Every domain linked to CodeTribe and CodeJIKA, with a keep-or-remove suggestion per row for Jon to confirm.
- [_plans/frontend-next16-shadcn.md](_plans/frontend-next16-shadcn.md) — Plan to upgrade the frontend to Next 16, React 19 and Tailwind 4 and start moving from MUI to shadcn/ui, with phases and risks.
- [_plans/google-signin-domains.md](_plans/google-signin-domains.md) — Plan to make Google sign-in work on every domain that serves the app (fixing redirect_uri_mismatch).
- [_plans/guest-code-sign-in-and-lesson-moves.md](_plans/guest-code-sign-in-and-lesson-moves.md) — Plan for keeping a guest's code when they sign in and when they move between lessons.
- [_plans/leave-heroku.md](_plans/leave-heroku.md) — How the code runner used the Heroku n8n, the options for Python and Java, and the steps to shut Heroku down.
- [_plans/lesson-only-link-course-redirect.md](_plans/lesson-only-link-course-redirect.md) — How lesson-only code panel links find the lesson's course and unit (backend coursePlacement) and open the full link.
- [_plans/lesson-only-links.md](_plans/lesson-only-links.md) — Investigation and fixes for blank code panel previews (lesson-only links, manual run, Python and Java re-runs), plus the run-mode decision.
- [_plans/n8n-and-heroku.md](_plans/n8n-and-heroku.md) — What uses n8n and Heroku today, which workflows run where, and the plan to replace them with code.
- [_plans/own-jokes-api.md](_plans/own-jokes-api.md) — How the joke lessons moved from a dead outside API to our own kid-friendly /api/jokes/random, including the lesson and student-code changes and their backups.
- [_plans/production-hardening.md](_plans/production-hardening.md) — Plan to harden the production server without downtime or extra cost.
- [_plans/progress-for-signed-in-student-only.md](_plans/progress-for-signed-in-student-only.md) — The fix that makes lesson endpoints return only the signed-in student's progress, with measurements and design.
- [_plans/public-docs-top-20-guides.md](_plans/public-docs-top-20-guides.md) — Plan for a public help site at codetribe.ai/docs, with one Markdown guide per task, screenshots and llms.txt for agents.
- [_plans/staging-site.md](_plans/staging-site.md) — Proposal for a staging.codetribe.ai test site on the same Netlify setup, and which backend it should use.
- [_plans/teacher-signup-followups.md](_plans/teacher-signup-followups.md) — Issues the teacher sign-up fix turned up (class covers, welcome emails, starter lesson, student accounts that own schools) and their status.
- `_plans/own-jokes-api-*.json` (7 files) — Backups and change sets of the Nov 13, 2026 joke lesson edits. See [_plans/own-jokes-api.md](_plans/own-jokes-api.md).
- `_plans/teacher-signup-backfill-1-2026-11-13.txt`, `_plans/teacher-signup-backfill-2-2026-11-13.txt` — Rows inserted by the teacher sign-up back-fills, kept for undo. See [_plans/teacher-signup-followups.md](_plans/teacher-signup-followups.md).
- `_plans/class-covers-set-2026-11-13.txt` — Ids of the classes whose empty covers were set on Nov 13, 2026. See [_plans/teacher-signup-followups.md](_plans/teacher-signup-followups.md).
- `_plans/teacher-starter-lesson-copies-2026-11-13.txt` — Ids of the removed starter lesson copies, kept as a record. See [_plans/teacher-signup-followups.md](_plans/teacher-signup-followups.md).
