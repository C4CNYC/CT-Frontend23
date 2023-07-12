import type { Meta } from "@storybook/react";

import { voidFunction } from "@utils";

import ToggleButton from "./ToggleButton";

const Component: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  title: "Settings/ToggleButton",
};

export default Component;

export const Default: Meta<typeof ToggleButton> = {
  args: {
    open: true,
    notDefault: false,
    onToggle: voidFunction,
  },
};
