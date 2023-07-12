import type { Meta } from "@storybook/react";

import { LogoSmall } from "./LogoSmall";

const Component: Meta<typeof LogoSmall> = {
  component: LogoSmall,
  title: "Logo/LogoSmall",
};

export default Component;

export const Default = {
  args: {},
};
