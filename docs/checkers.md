---
title: Checkers System
description: Lesson checks that validate student code (regex checks and iframe signals), where their code lives and how they run.
---

# Checkers System

## Overview
Validation system for student code submissions with real-time checking and iframe communication.

## Core Components

### Data Layer
- `src/redux/services/interfaces/lessonContentValidation.interface.ts` - Checker interface
- `src/redux/services/manager/lesson-content-validation-manager.ts` - API endpoints
- `src/redux/slices/checkers-animation.ts` - Animation states
- `src/redux/slices/code-panel-global.ts` - Checker state management

### Validation Logic
- `src/hooks/useCheckers.ts` - Main validation hook, handles:
  - Code state monitoring
  - Validation execution via `CheckValidationTests()`
  - Iframe message handling for checker signals
  - State updates and animations
- `src/utils/CheckValidationTests.ts` - Test execution utilities
- `src/hooks/useValidationManager.ts` - Validation management

### Teacher Interface
- `src/sections/dashboard/lessons/LessonStep/Modals/CreateEditValidation.tsx` - Create/edit checker form
- `src/sections/dashboard/lessons/LessonStep/Modals/Validation.tsx` - Checker display

### Student Interface
- `src/sections/code-panel/components/body/blocks/code-editor-block/elements/checkers-code-editor/` - Checker UI components:
  - `index.tsx` - Main checker display
  - `checkers-menu/index.tsx` - Checker menu
  - `checkers-item-text/index.tsx` - Individual checker items
  - `CheckersIcon.tsx` - Checker status icons

## How Checkers Work

### 1. Teacher Creates Checkers
Teachers use `CreateEditValidation.tsx` to create validation rules with:
- `name` - Display name
- `regex` - Validation pattern (current implementation)
- `description` - What the checker validates (new)
- `type` - Checker type: regex|output|code|input|action|signal (new)

### 2. Student Code Evaluation
`useCheckers.ts` monitors student code changes:
1. Combines all file contents into `codeState`
2. Runs `CheckValidationTests()` against validation rules
3. Updates checker status and animations
4. Manages progression (all passed = next step available)

### 3. Iframe Communication
For advanced checkers, iframe messaging enables:
- Custom validation logic in student's running code
- Real-time status updates via `postMessage`
- Cross-frame checker synchronization

### 4. State Management
- `contentValidations` - Current validation states per slide
- `completedSlides` - Tracks which slides passed all checkers
- Animations triggered when new checkers pass

## Checker Types (New Implementation Needed)
- **regex** - Pattern matching (current default)
- **output** - Expected console output
- **code** - Code structure validation  
- **input** - User interaction validation
- **action** - Behavioral validation
- **signal** - Custom iframe signals