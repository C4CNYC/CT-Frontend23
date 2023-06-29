import type { Meta } from "@storybook/react";
import { LightboxComponent } from "./LightboxComponent";

const Component: Meta<typeof LightboxComponent> = {
  component: LightboxComponent,
  title: "LightboxComponent",
};

export default Component;

export const Default = {
  args: {
    index: 0,
    open: true,
    slides: [
      {
        src: "assets/images/portraits/protrait_1.jpg",
      },
      {
        src: "https://www.pngwing.com/en/search?q=avatar",
      },
      {
        src: "https://www.pngwing.com/en/search?q=avatar",
      },
      {
        src: "https://www.pngwing.com/en/search?q=avatar",
      },
    ],
    disabledZoom: false,
    disabledVideo: false,
    disabledTotal: false,
    disabledCaptions: false,
    disabledSlideshow: false,
    disabledThumbnails: false,
    disabledFullscreen: false,
  },
};
