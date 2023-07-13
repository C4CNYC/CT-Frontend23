import type { Meta } from "@storybook/react";

import { Image } from "./Image";

const Component: Meta<typeof Image> = {
  component: Image,
  title: "Image",
};

export default Component;

export const Default = {
  args: {
    disabledEffect: false,
    ratio: "4/3",
    src: "/courses/courseImg.png",
  },
};
