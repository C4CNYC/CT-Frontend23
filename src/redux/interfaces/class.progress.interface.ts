/**
 * Represents the duration of a lesson or unit.
 * Can have hours, minutes, or both.
 */
interface DurationProgress {
  hours?: number
  minutes?: number
}

/**
 * Represents a single lesson within a course unit.
 */
interface LessonProgress {
  id: string
  createdAt: string
  updatedAt: string
  active: boolean
  draft: boolean
  name: string
  auto_graded: boolean
  core: boolean
  type: string
  description: string
  head: string
  userId: string
  tips: any[] // An array of tips, type can be made more specific if known
  duration: DurationProgress
  independent: boolean
  slug: string
  meta: Record<string, any> // A flexible object for metadata
}

/**
 * Represents a unit within a course, containing multiple lessons.
 */
interface CourseUnitProgress {
  id: string
  createdAt: string
  updatedAt: string
  active: boolean
  name: string
  avatar: string
  background: string | null
  initial_enrolled: number
  initial_likes: number
  initial_stars: number
  description: string
  tips: any[]
  duration: DurationProgress
  sort: number
  level: string
  customLevel: string | null
  age: string
  customAge: string | null
  grading: string
  brief: string | null
  audience: string | null
  teacher_forum: string | null
  lesson_plans: string | null
  teacher_slides: string | null
  meta: Record<string, any>
  lessons: LessonProgress[]
}

/**
 * Represents the main course, containing multiple units.
 */
interface CourseProgress {
  id: string
  createdAt: string
  updatedAt: string
  active: boolean
  public: boolean
  catalog: boolean
  userId: string | null
  draft: boolean
  name: string
  price: string
  content_id: string
  level: string
  customLevel: string | null
  age: string
  customAge: string | null
  description: string
  cover: string
  preview: string | null
  initial_enrolled: number
  initial_likes: number
  initial_stars: number
  audience: string | null
  for_teachers: string | null
  is_global: boolean
  units: CourseUnitProgress[]
}

/**
 * Represents the top-level class/assignment object.
 * This is the main object in your provided JSON.
 */
interface ClassDataProgress {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  courseUnitId: string
  lessonId: string
  description: string
  type: string
  category: string
  language: string
  lessonTitle: string
  status: string
  duration: Duration | null
  active: boolean
  start_date: string
  end_date: string
  close_date: string
  meta: Record<string, any>
  course: CourseProgress
}
