import type { Meta } from "@storybook/react";

import ColorPresetsOptions from "./ColorPresetsOptions";

const Component: Meta<typeof ColorPresetsOptions> = {
  component: ColorPresetsOptions,
  title: "Settings/ColorPresetsOptions",
};

export default Component;

export const Default = {
  args: {},
};
