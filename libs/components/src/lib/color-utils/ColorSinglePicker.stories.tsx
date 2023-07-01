import type { Meta } from "@storybook/react";
import { ColorSinglePicker } from "./ColorSinglePicker"
import { voidFunction } from "@ct-nx/utils";

const Component: Meta<typeof ColorSinglePicker> = {
  component: ColorSinglePicker,
  title: "ColorUtils/ColorSinglePicker",
};

export default Component;

export const Default = {
  args: {
    colors: ["white", "lightgreen", "red", "darkblue"],
    onChange: (e: any) => {voidFunction()}
  },
};
