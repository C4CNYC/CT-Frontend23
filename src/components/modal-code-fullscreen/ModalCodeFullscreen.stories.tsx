import type { Meta } from "@storybook/react";

import { ModalCodeFullscreen } from "./ModalCodeFullscreen";

const Component: Meta<typeof ModalCodeFullscreen> = {
  component: ModalCodeFullscreen,
  title: "ModalCodeFullscreen",
};

export default Component;

export const Default = {
  args: {
    title: "title",
    name: "name",
  },
};
