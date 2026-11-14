---
title: Helpers & Utils
description: Utility functions in src/utils (time, numbers, strings, localStorage) and the custom hooks in src/hooks.
---

# Helpers & Utils

## Utils (`src/utils/`)
- `axios.ts` - HTTP client
- `formatTime.ts`, `convertDuration.ts`, `convertDurationToHours.ts`, `convertDurationToMins.ts`, `convertMinsToString.ts`
- `formatNumber.ts`, `convertNumber.ts`
- `capitalizeFirstSymbol.ts`, `capitalizeSnakeCase.ts`
- `localStorageAvailable.ts`, `localStorageClear.ts`, `progressLocalStorage.ts`
- `CheckValidationTests.ts`, `isValidRegex.ts`, `isJson.ts`, `isUuid.ts`
- `getFileExtension.ts`, `isImageUrl.ts`, `imageResize.ts`
- `generateUUID.ts`, `generate-id.ts`, `createRandomAvatar.ts`
- `ai-generate.ts`, `stripQuotesFromAiResponse.ts`
- `addAlpha.ts`, `cssStyles.ts`, `getLinearGradient.ts`, `randomGradient.ts`
- `assignmentDateParser.ts`, `hasUserMadeProgress.ts`, `getTaskOrder.ts`
- `messaging.ts`, `translateHelper.ts`, `serverUtils.ts`
- `flattenArray.ts`, `unfreeze.ts` - Deep clone frozen objects
- `voidFunction.ts` - Empty function utility
- `countTakingElments.ts` - Pagination count calculation
- `convertSkillsArrToObject.ts` - Convert string array to skill objects
- `detectZeroAmount.ts` - Check for zero values

## Hooks (`src/hooks/`)
- `useResponsive.ts`, `useIsDesktop.ts`, `useWindowDimension.ts`
- `useCopyToClipboard.ts`, `useDebounceCallback.tsx`, `useDebouncedEffect.tsx`
- `useCountdown.ts`, `useCounter.ts`, `use-boolean.ts`
- `useValidationManager.ts`, `useCheckers.ts` - Student code evaluation
- `useActiveLink.ts`, `useLogin.ts`, `useTenants.ts`, `useSchoolId.ts`
- `useFilters.ts`, `useProperties.ts`
- `useControlEllipsis.ts` - Detect text overflow ellipsis
- `useDoubleClick.ts`, `useEventListener.ts`, `useMobileKeyboard.ts`, `useOffSetTop.ts`