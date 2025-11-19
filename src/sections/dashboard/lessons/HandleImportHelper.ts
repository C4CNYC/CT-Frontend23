import { LessonType } from '@root/src/redux/services/enums/lesson-type.enum'

export function MdFileDump2LessonJSON(mdStr: string): string {
  const slides = mdStr
    .split(/^---$/m)
    .map((s) => s.trim())
    .filter(Boolean)

  const contents = slides.map((slide, index) => {
    const titleMatch = slide.match(/^## (.+)$/m)
    const title = titleMatch ? titleMatch[1].trim() : `Slide ${index + 1}`

    const bodyMatch = slide.match(/### [^\n]+\n([\s\S]*?)\n\n\*\*/m)
    const bodyText = bodyMatch ? bodyMatch[1].trim() : ''

    const challengeMatch = slide.match(/\*\*🎯 CHALLENGE:\*\*([\s\S]*?)\n\n\[/m)
    const challenge = challengeMatch ? challengeMatch[1].trim() : ''

    const testsMatch = slide.match(/\*\*🎯 TESTS:\*\*([\s\S]*)$/m)
    const tests = testsMatch
      ? testsMatch[1]
          .split(/^====/m)
          .map((t) => t.trim())
          .filter(Boolean)
      : []

    return {
      id: `content-${index + 1}`,
      type: 'slide',
      slug: `slide-${index + 1}`,
      title,
      description: challenge,
      cover: '',
      complexity: 'beginner',
      body: JSON.stringify({ extension: 'md', content: bodyText }),
      active: true,
      draft: false,
      solution_body: '',
      preload_body: '',
      tips: '',
      tags: [],
      meta: { order: index + 1 },
      bg_color: '',
      validations: tests.map((t, i) => ({
        name: `test-${i + 1}`,
        regex: '',
        description: t,
        type: 'text',
      })),
      files: [],
    }
  })

  let lessonExported = {
    lesson: {
      id: 'lesson-1',
      active: true,
      draft: false,
      name: 'Untitled Lesson',
      auto_graded: true,
      core: false,
      type: LessonType.PRACTICAL,
      description: 'Auto-generated from mdStr',
      head: '',
      tips: [],
      duration: '',
      independent: true,
      slug: 'auto-lesson',
      meta: {},
      contents,
    },
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
  }

  return JSON.stringify(lessonExported, null, 2)
}
