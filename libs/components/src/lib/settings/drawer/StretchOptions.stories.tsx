import type { Meta } from "@storybook/react";
import StretchOptions from "./StretchOptions";
import { ThemeProvider } from "@ct-nx/theme";

const Component: Meta<typeof StretchOptions> = {
  component: StretchOptions,
  title: "Settings/StretchOptions",
};

export default Component;

export const Default: Meta<typeof StretchOptions> = {
  args: {},
};
