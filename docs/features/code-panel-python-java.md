---
title: Code Panel – Python and Java Runner
description: How Python (MicroPython in the browser) and Java (Judge0 through n8n) lessons run against the lesson's tests, and how results reach the checks.
---

# Code Panel: Python and Java Runner

Checked against C4CNYC/CT-26 `main` (`5ee1623`, Nov 14, 2026), which serves app.codetribe.com, app.codejika.org and codetribe.ai. Paths are relative to `Frontend/src/sections/code-panel/components/browserview/`.

## Overview
- Lessons with a `.py` or `.java` file run the student's code against the lesson's tests and show the results, instead of drawing a web page.
- Python runs in the student's browser. Java runs on Judge0 through n8n.
- How the panel picks this runner, and the HTML preview: see [code-panel-preview.md](code-panel-preview.md).

## Core Components
- `BrowserViewEx.tsx`: picks the runner, starts runs, and shows the results box.
- `prepare/python.ts`, `prepare/java.ts`: wrap the student's code with the lesson's tests.
- `run/python.ts`, `run/python.worker.ts`: run Python with MicroPython 1.26.0 in a Web Worker.
- `run/java.ts`: sends Java to the n8n `CodeRunner` webhook, which runs it on Judge0.
- `run/codeRunResult.ts`: the result shape both runners return.

## How It Works

### 1. When it runs
- On open, and on each Run or Refresh (`runCount` from `ViewBlock`), never while typing.
- The Run button always shows for these lessons, even when the lesson is set to auto-run.
- Run is ignored while a run is in progress and for 2 s afterwards.

### 2. Python
- `preparePythonCode` joins three parts: the student's code, the `.test` file (which defines `student_fn` and a `tests` dict of `{input, output}`), and a `main()` that calls the function for each test.
- The worker runs that program in a fresh namespace, calls `main()`, and returns `{ stdout, err, output: { passed, failed, all } }`.
- MicroPython (~185 KB) loads from `/assets/js/micropython-1.26.0/` only when a Python lesson runs.
- Loading may take up to 60 s, and each run is stopped after 10 s.

### 3. Java
- `prepareJavaCode` joins three parts: `StudentCode`, the `Tests` class (`STUDENT_FN` and `int[]` test cases), and a `Main` that prints the results.
- `runJavaOnJudge0` posts `{ prompt: { code, language: 'java' } }` to the webhook and gets back the same result shape.

### 4. Results
- The box shows the test summary, then the program's output, then any errors.
- Each passed test posts `checker-validation` with the test's name. An all-pass also posts `All Tests`, so the slide's checks can pass.

## Rules Worth Knowing
- On a failed Java test, the "Got:" line prints the input instead of the student's result (`prepare/java.ts`).
