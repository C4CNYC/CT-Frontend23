---
title: Code Panel – Students' Code Files
description: Where the editor's code comes from (guest browser cache or a signed-in student's saved copy), carry-over, and why lesson edits don't reach returning students.
---

# Code Panel: Students' Code Files

Checked against C4CNYC/CT-26 `main` (`5ee1623`, Nov 14, 2026), which serves app.codetribe.com, app.codejika.org and codetribe.ai.

## Overview
- The code editor shows a set of files for each lesson. Guests get the lesson's starter files, cached in the browser. Signed-in students get their own saved copy on the server.
- How the files are run and shown: see [code-panel-preview.md](code-panel-preview.md) and [code-panel-python-java.md](code-panel-python-java.md).

## Core Components
- `Frontend/src/sections/code-panel/components/body/blocks/code-editor-block/code-editor-collab/hook/file-manager/useFileManager.tsx`: the files shown in the editor, for guests and signed-in students.
- `Backend/src/modules/managers/workspace-manager/workspace-manager.service.ts`:
  - `getFiles`: serves a signed-in student's saved copy, and creates it on first open.
  - `getFilesByUnauthUser`: serves the starter files to guests.
- Tables: `lesson-content-files` (starter files, `preloaded_code`) and `student-lesson-files` (students' saved copies).

## How It Works

### 1. Guests
- `GET /public/workspace?lessonId&lessonContentId` returns the slide's starter files, or a default file by lesson type.
- They're cached in `localStorage`:
  - `room_doc_<lessonId>_<slideId>` for EXERCISE, START_PROJECT, QUIZ and OTHER lessons.
  - `room_doc_<lessonId>` for the rest.
  - Sandbox mode adds `_sandbox`.

### 2. Signed-in students
- `GET /student/workspace` returns the student's own rows in `student-lesson-files`.
- The first open copies the starter files: one set per slide for EXERCISE lessons, and one per lesson for every other type.
- Edits save to those rows.
- If `localStorage` holds guest code for the lesson that differs from the saved copy, it's saved to the server and removed from `localStorage`.

### 3. Carry-over
- Finishing a lesson copies its files into the next one when that lesson is PRACTICAL or PART_PROJECT and not independent.

## Rules Worth Knowing
- Changing a lesson's starter files doesn't reach students who already have a saved copy in `student-lesson-files`. Update those rows as well.
- Solution code (`solution_body`, shown under Help → full code solution) is stored on the slide, not in these files, and needs the same updates as the starter files.
