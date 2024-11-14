export const LESSON_CREATION_INTRO = [
  {
    target: '.lessonCreationStep1',
    title: <div>Hi there 👋🏼</div>,
    content: (
      <div>
        <p>This is the “Lesson Editor.” ✏️</p>
        <p>You can edit or create new lessons here.</p>
      </div>
    ),
    disableBeacon: true,
    placement: 'center' as const,
  },
  {
    target: '.lessonCreationStep2',
    title: <div>Slides 🛝</div>,
    content: <div>These are the slides - The pages. Add, edit or re-order them here.</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.lessonCreationStep3',
    title: <div>Choose your Format 🎨</div>,
    content: <div>You can create slides in a simple editor 📄 or in HTML.</div>,
    disableBeacon: true,
    placement: 'auto' as const,
  },
  {
    target: '.lessonCreationStep4',
    title: <div>Preview Student View 👩‍🎓🔍</div>,
    content: <div>See how the slides look in the Coding Panel (Workspace). </div>,
    disableBeacon: true,
    placement: 'left' as const,
  },
]
