import type { Meta } from "@storybook/react";

import Block from "./Block";

const Component: Meta<typeof Block> = {
  component: Block,
  title: "Settings/Block",
};

export default Component;

export const Default: Meta<typeof Block> = {
  args: {
    title: "Title",
    tooltip: "Tooltip",
    children: <>children component</>,
  },
};
