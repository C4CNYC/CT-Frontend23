---
title: Code Panel – Preview and Run Modes
description: How the code panel finds the lesson and its auto-run or manual mode, picks the preview, builds the HTML preview and decides when to redraw.
---

# Code Panel: Preview and Run Modes

Checked against C4CNYC/CT-26 `main` (`5ee1623`, Nov 14, 2026), which serves app.codetribe.com, app.codejika.org and codetribe.ai. Paths are relative to `Frontend/src/sections/code-panel/` unless they start with `Frontend/` or `Backend/`.

## Overview
- The right-hand panel shows the result of the student's files. HTML lessons draw a web page in a preview frame.
- Each lesson is either auto-run (redraws as the student types) or manual (redraws on Run or Refresh).
- Python and Java lessons use a separate runner: see [code-panel-python-java.md](code-panel-python-java.md). Where the files come from: see [code-panel-student-files.md](code-panel-student-files.md).

## Core Components
- `index.tsx` (`CodePanelLayout`): resolves the lesson from the link and sets `state.codePanelGlobal.lessonId`.
- `lib/CodePanelContextProvider.tsx`: reads the lesson's `autoRun` setting and bumps `reloadIframeKey` on auto-run edits.
- `components/body/blocks/view-block/index.tsx` (`ViewBlock`): Run and Refresh buttons, the `runCount` click counter, and the choice of preview.
- `components/browserview/BrowserViewHTML.tsx`: builds the HTML document from the files and writes it into the frame's `srcdoc`.

## How It Works

### 1. Lesson and run mode
- **Full link** (`?courseId&unitId&lessonId`): the lesson comes from the course content.
- **Lesson-only link** (`?lessonId=`): `GET /student/lesson/without-contents/:id` returns `coursePlacement` (`courseId`, `unitId`), and the page `router.replace`s to the full link.
  - It picks a course from the student's own class first, then the oldest active course, then the unit with the lowest `sort`.
  - A lesson in no course stays lesson-only, and `lessonId` comes from the lesson itself.
- **Run mode:** the lesson property `autoRun` (`entityType: 'lesson'`, read for `state.codePanelGlobal.lessonId`) set to `'true'` means auto-run. Anything else, or no setting, means manual (decided Nov 13, 2026).
- **Slide order:** slides are sorted by `meta.order` in `Frontend/src/redux/services/manager/lesson-student.ts`.

### 2. Choosing the preview
- `ViewBlock` checks the file extensions. Any `.py` or `.java` file → `BrowserViewEx` (the Python and Java runner). Otherwise → `BrowserViewHTML`.
- Run and Refresh add 1 to `runCount`. HTML auto-run lessons hide both buttons.

### 3. The HTML document (`BrowserViewHTML`)
- `.html` bodies; `.md` rendered with markdown-it (+ attrs) inside `.markdown-body`; `.css` in a `<style>`; `.js` in `<script>` tags; the lesson's integration scripts in `<head>`.
- A test script at the end: the lesson's `.test` files, plus the current slide's `execute` checks. Each check is `eval`ed and reported with `validateChecker(name, ok)`.
- **Messages to the code panel:** `checker-validation`, `nextSlide(skip)`, `prevSlide()` and `goToSlide(i)`. Console output goes to the Console panel as `ConsoleLog`.
- Relative URLs in student code, such as `fetch("/api/jokes/random")`, resolve against the site the student is on.

### 4. When it draws
- **Auto-run:** 500 ms after the files change.
- **Manual:** when the set of files changes (so on open, and when another slide's files load), and on each Run or Refresh (`iframeKey = runCount + reloadIframeKey`).

### 5. Checks
- Regex checks are stored as `/pattern/flags` strings and run against the editor's code. See `docs/checkers.md`.

## Rules Worth Knowing
- No `autoRun` setting means manual run.
- Previews that load code as a `data:` URL can't resolve relative URLs. These are the dashboard gallery drawer and the lesson editor's step previews.
