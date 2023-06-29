import type { Meta } from "@storybook/react";
import { IconButtonAnimate } from "./IconButtonAnimate";

const Component: Meta<typeof IconButtonAnimate> = {
  component: IconButtonAnimate,
  title: "Animate/IconButtonAnimate",
};

export default Component;

export const Default = {
  args: {
    size: 'large',
    color: 'primary',
    disabled: false,
    disableFocusRipple: false,
    disableRipple: false,
    edge: 'end',
    variant: 'primary',
    tabIndex: 0,
    children: "button text"
  },
};
