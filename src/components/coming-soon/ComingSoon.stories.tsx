import type { Meta } from "@storybook/react";

import { ComingSoon } from "./ComingSoon";

const Component: Meta<typeof ComingSoon> = {
  component: ComingSoon,
  title: "ComingSoon",
};

export default Component;

export const Default = {
  args: {
    title: "Coming soon ...",
    children: <>Example children content</>,
    sxContainer: {
      width: 100,
      height: 100,
      padding: 10,
    },
    sxBtn: {
      background: "lightgreen",
    },
  },
};
