import type { Meta } from "@storybook/react";

import { Logo } from "./Logo";

const Component: Meta<typeof Logo> = {
  component: Logo,
  title: "Logo/Logo",
};

export default Component;

export const Default = {
  args: {},
};
