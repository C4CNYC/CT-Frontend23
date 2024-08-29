export const TOUR_STEPS_MAIN = [
  {
    target: '.tourMainStep2',
    title: <div>Tribes ( Classes )</div>,
    content: <div>Here you will see the Tribes you have created or are a part of.</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.tourMainStep3',
    title: <div>Tribe (Class) Information</div>,
    content: <div>Here you can see general information about the current class.</div>,
    disableBeacon: true,
    placement: 'right' as const,
  },
  {
    target: '.tourMainStep4',
    title: <div>Quests list </div>,
    content: (
      <div>
        The quests (Assignments) for the Tribe are listed here. You can also manage members and
        Tribe details in the other tabs.
      </div>
    ),
    disableBeacon: true,
    placement: 'right' as const,
  },
]
