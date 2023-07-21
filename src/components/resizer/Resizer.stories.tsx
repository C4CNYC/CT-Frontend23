import type { Meta } from "@storybook/react";

import { ResizerUi } from "./Resizer";

const Component: Meta<typeof ResizerUi> = {
  component: ResizerUi,
  title: "Resizer",
};

export default Component;

export const Default = {
  args: {
    children: <>some children content for text resizer component</>,
    allowResize: true,
    primary: "first",
    split: "vertical",
    step: 10,
  },
};
