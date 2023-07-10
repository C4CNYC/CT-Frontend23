import type { Meta } from "@storybook/react";

import { SideMenu } from "./index";

const Component: Meta<typeof SideMenu> = {
  component: SideMenu,
  title: "SideMenu",
};

export default Component;

export const Default = {
  args: {},
};
