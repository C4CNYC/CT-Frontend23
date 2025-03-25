export const LessonTypePseudo = {
  concept_exercises: 'concept_exercises',
  exercise: 'exercise',
  other: 'other',
  part_project: 'part_project',
  practical: 'practical',
  quiz: 'quiz',
  simple: 'simple',
  start_project: 'start_project',
} as const

export type LessonTypePseudoEnum = keyof typeof LessonTypePseudo

export enum LessonType {
  PRACTICAL = 'practical',
  EXERCISE = 'exercise',
}
