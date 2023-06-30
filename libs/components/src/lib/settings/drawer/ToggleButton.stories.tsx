import type { Meta } from "@storybook/react";
import ToggleButton, { ToggleButtonProps } from "./ToggleButton";
import { ThemeProvider } from "@ct-nx/theme";

const Component: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  title: "Settings/ToggleButton",
};

export default Component;

export const Default: Meta<typeof ToggleButton> = {
  args: {
    open: true,
    notDefault: false,
    onToggle: () => {}
  },
};
