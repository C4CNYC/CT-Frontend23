import type { Meta } from "@storybook/react";

import { MenuPopover } from "./MenuPopover";

const Component: Meta<typeof MenuPopover> = {
  component: MenuPopover,
  title: "MenuPopover",
};

export default Component;

export const Default = {
  args: {
    open: true,
    children: <>children</>,
    disabledArrow: false,
    arrow: "top-left",
  },
};
