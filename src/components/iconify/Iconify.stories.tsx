import type { Meta } from "@storybook/react";

import { Iconify } from "./Iconify";

const Component: Meta<typeof Iconify> = {
  component: Iconify,
  title: "Iconify",
};

export default Component;

export const Default = {
  args: {
    icon: "devicon-plain:materialui",
    width: 40,
  },
};
