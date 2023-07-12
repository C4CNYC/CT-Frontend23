import type { Meta } from "@storybook/react";

import { CustomAvatar } from "./CustomAvatar";

const Component: Meta<typeof CustomAvatar> = {
  component: CustomAvatar,
  title: "CustomAvatar/CustomAvatar",
};

export default Component;

export const Default = {
  args: {
    color: "primary",
    variant: "rounded",
    name: "Custom avatar",
  },
};
