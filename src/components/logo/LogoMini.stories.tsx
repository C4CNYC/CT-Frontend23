import type { Meta } from "@storybook/react";

import { LogoMin } from "./LogoMin";

const Component: Meta<typeof LogoMin> = {
  component: LogoMin,
  title: "Logo/LogoMini",
};

export default Component;

export const Default = {
  args: {},
};
