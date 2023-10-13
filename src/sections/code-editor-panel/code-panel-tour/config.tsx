import { Image } from "@components";

export const TOUR_STEPS_DECKTOP = [
  {
    target: ".tourStart",
    title: <div>💥 Hi coder! 💥</div>,
    content: (
      <div>
        <Image
          src="/assets/illustrations/auth-cat.png"
          alt="mumu tiger"
          sx={{ py: 1, minHeight: "290px" }}
        />
        I'will show you what do we have here. The Code Panel consists of:
      </div>
    ),
    disableBeacon: true,
    placement: "center" as const,
  },
  {
    target: ".sliderTour",
    title: <div>Slider</div>,
    content: <div>It's contain information 📖 from the teacher</div>,
    disableBeacon: true,
    placement: "right" as const,
  },
  {
    target: ".codeEditorTour",
    title: <div>Work space</div>,
    content: (
      <div>
        You have nice code editor where you could show your coding skills 💪
      </div>
    ),
    disableBeacon: true,
    placement: "right" as const,
  },
  {
    target: ".browserTour",
    title: <div>Browser</div>,
    content: (
      <div>Here you will see the results of your work in realtime 🤯</div>
    ),
    disableBeacon: true,
    placement: "left" as const,
  },
  {
    target: ".lessonsTour",
    title: <div>Lesons list</div>,
    content: <div>Feel free to choose lesson which you want 😉 or ...</div>,
    disableBeacon: true,
    placement: "top" as const,
  },
  {
    target: ".coursesTour",
    content: <div>Check your learning progress </div>,
    disableBeacon: true,
    spotlightPadding: 20,
    placement: "top" as const,
  },
  {
    target: ".tourBottombarMenu",
    content: <div>Save or publish your project</div>,
    disableBeacon: true,
    spotlightPadding: 25,
    placement: "top" as const,
  },
  {
    target: ".topBarTour",
    title: <div>Now let`s look at this usefull part</div>,
    content: (
      <div>
        <p>
          Here we have timer, queston, settings and... wait a minute... you're a
          coder, you know how to test new things 😌. Don't be shy and click on
          each!
        </p>
        <div>
          <iframe
            src="https://giphy.com/embed/7NoNw4pMNTvgc"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ),
    disableBeacon: true,
    placement: "bottom" as const,
  },
];

export const TOUR_STEPS_MOBILE = [
  {
    target: ".tourStart",
    title: <div>💥 Hi coder! 💥</div>,
    content: (
      <div>
        <Image
          src="/assets/illustrations/auth-cat.png"
          alt="mumu tiger"
          sx={{ py: 1, minHeight: "180px" }}
        />
        I'will show you what do we have here. The Code Panel consists of:
      </div>
    ),
    disableBeacon: true,
    placement: "center" as const,
  },
  {
    target: ".sliderTour",
    title: <div>Slider</div>,
    content: (
      <div>
        It's contain information 📖 from the teacher, space for practice and
        online browser
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: ".smallSliderTour",
    title: <div>Navigation</div>,
    content: <div>Here you can change this tabs</div>,
    disableBeacon: true,
  },
  {
    target: ".lessonsTourMobile",
    title: <div>Lesons list</div>,
    content: <div>Feel free to choose lesson which you want 😉</div>,
    disableBeacon: true,
    placement: "top" as const,
  },
  {
    target: ".coursesTour",
    content: <div>check your learning progress </div>,
    disableBeacon: true,
    placement: "top" as const,
  },
  {
    target: ".menuTourMobile",
    title: <div>Now let`s look at this usefull part</div>,
    content: (
      <div>
        <p>
          Here we have some links, settings and... wait a minute... you're a
          coder, you know how to test new things 😌. Don't be shy and click on
          each!
        </p>
        <div>
          <iframe
            src="https://giphy.com/embed/7NoNw4pMNTvgc"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ),
    disableBeacon: true,
    placement: "bottom" as const,
  },
];
