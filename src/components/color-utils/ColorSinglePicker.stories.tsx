import type { Meta } from "@storybook/react";

import { voidFunction } from "@utils";

import { ColorSinglePicker } from "./ColorSinglePicker";

const Component: Meta<typeof ColorSinglePicker> = {
  component: ColorSinglePicker,
  title: "ColorUtils/ColorSinglePicker",
};

export default Component;

export const Default = {
  args: {
    colors: ["white", "lightgreen", "red", "darkblue"],
    onChange: (e: any) => {
      voidFunction();
    },
  },
};
