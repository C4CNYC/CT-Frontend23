import type { Meta } from "@storybook/react";
import ToggleButton from "./ToggleButton";
import { voidFunction } from "@ct-nx/utils";

const Component: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  title: "Settings/ToggleButton",
};

export default Component;

export const Default: Meta<typeof ToggleButton> = {
  args: {
    open: true,
    notDefault: false,
    onToggle: voidFunction
  },
};
