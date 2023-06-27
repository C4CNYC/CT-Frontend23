import type { Meta } from "@storybook/react";
import { SvgColor } from "./SvgColor"

const Component: Meta<typeof SvgColor> = {
  component: SvgColor,
  title: "SvgColor/SvgColor",
};

export default Component;


export const Default: Meta<typeof SvgColor> = {
  args: {
    src: "/assets/shape_avatar.svg"
  },
};
