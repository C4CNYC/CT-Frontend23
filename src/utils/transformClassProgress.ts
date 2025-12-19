import { ClassProgressResult } from '@/redux/interfaces/class.interface'
import {
  IClassProgress,
  IClassProgressCourse,
  IClassProgressModule,
  IClassProgressLesson,
} from '@/redux/interfaces/class.interface'

/**
 * Transforms ClassProgressResult to IClassProgress format
 * This function converts the new flat progress data structure into a hierarchical
 * structure expected by the ProgressTable component
 */
export function transformClassProgress(
  classProgressResult: ClassProgressResult,
  students: Array<{ id: string; first_name: string; last_name: string; username?: string | null }>
): IClassProgress[] {
  // Create a map of student data for quick lookup
  const studentMap = new Map(students.map((student) => [student.id, student]))

  // Group progress data by student
  const progressByStudent = new Map<string, Map<string, number>>()

  classProgressResult.progressData.forEach((item) => {
    if (!progressByStudent.has(item.student_id)) {
      progressByStudent.set(item.student_id, new Map())
    }
    const studentProgress = progressByStudent.get(item.student_id)!
    studentProgress.set(item.lesson_id, parseInt(item.completed_count))
  })

  // Transform assignments into course/module/lesson structure
  const courses = classProgressResult.classInfo.assigments.map((assignment) => {
    // If assignment has course data, use it; otherwise create a basic structure
    if (assignment.course && assignment.course.units) {
      // Use real course data from the API
      const course: IClassProgressCourse = {
        id: assignment.id,
        content_id: assignment.course.content_id || assignment.id,
        name: assignment.course.name || assignment.name,
        description: assignment.course.description || assignment.description || '',
        due_date: assignment.close_date || assignment.end_date || '',
        progress: 0, // Will be calculated per student
        core: true, // Default value
        autoGraded:
          assignment.course.units?.some((unit) =>
            unit.lessons?.some((lesson) => lesson.auto_graded)
          ) ?? false,
        modules: [],
      }

      // Transform units into modules
      assignment.course.units.forEach((unit) => {
        const moduleData: IClassProgressModule = {
          id: unit.id,
          name: unit.name,
          description: unit.description || '',
          progress: 0, // Will be calculated per student
          core: true,
          autoGraded: unit.lessons?.some((lesson) => lesson.auto_graded) ?? false,
          lessons: [],
        }

        // Transform lessons
        if (unit.lessons) {
          unit.lessons.forEach((lesson) => {
            const lessonData: IClassProgressLesson = {
              id: lesson.id,
              name: lesson.name,
              progress: 0, // Will be calculated per student
              core: lesson.core ?? true,
              autoGraded: lesson.auto_graded ?? false,
              type: lesson.type as any,
              slides: [
                {
                  id: `${lesson.id}-slide`,
                  name: lesson.name,
                  description: lesson.description || '',
                  progress: 'not done', // Will be updated per student
                },
              ],
            }
            moduleData.lessons.push(lessonData)
          })
        }

        course.modules.push(moduleData)
      })

      return course
    } else {
      // Fallback for assignments without course data - create a basic structure
      const course: IClassProgressCourse = {
        id: assignment.id,
        content_id: assignment.id,
        name: assignment.name,
        description: assignment.description || '',
        due_date: assignment.close_date || assignment.end_date || '',
        progress: 0, // Will be calculated per student
        core: true, // Default value
        autoGraded: false,
        modules: [],
      }

      return course
    }
  })

  // Create IClassProgress array for each student
  const result: IClassProgress[] = []

  progressByStudent.forEach((studentProgressMap, studentId) => {
    const student = studentMap.get(studentId)
    if (!student) return // Skip if student data not found

    // Calculate progress for each course/module/lesson for this student
    const coursesWithProgress = courses.map((course) => {
      const courseCopy = { ...course }
      let totalLessons = 0
      let completedLessons = 0

      courseCopy.modules = course.modules.map((module) => {
        const moduleCopy = { ...module }
        let moduleTotalLessons = 0
        let moduleCompletedLessons = 0

        moduleCopy.lessons = module.lessons.map((lesson) => {
          const lessonCopy = { ...lesson }
          const completedCount = studentProgressMap.get(lesson.id) || 0

          // Calculate lesson progress (assuming each lesson has 1 slide/task)
          lessonCopy.progress = completedCount > 0 ? 100 : 0

          // Update slide progress
          lessonCopy.slides = lessonCopy.slides.map((slide) => ({
            ...slide,
            progress: completedCount > 0 ? 'done' : 'not done',
          }))

          moduleTotalLessons++
          if (completedCount > 0) moduleCompletedLessons++

          return lessonCopy
        })

        // Calculate module progress
        moduleCopy.progress =
          moduleTotalLessons > 0
            ? Math.round((moduleCompletedLessons / moduleTotalLessons) * 100)
            : 0

        totalLessons += moduleTotalLessons
        completedLessons += moduleCompletedLessons

        return moduleCopy
      })

      // Calculate course progress
      courseCopy.progress =
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      return courseCopy
    })

    result.push({
      id: studentId,
      first_name: student.first_name,
      last_name: student.last_name,
      username: student.username || '',
      courses: coursesWithProgress,
    })
  })

  return result
}
