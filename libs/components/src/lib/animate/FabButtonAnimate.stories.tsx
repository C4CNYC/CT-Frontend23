import type { Meta } from "@storybook/react";
import { FabButtonAnimate } from "./FabButtonAnimate";

const Component: Meta<typeof FabButtonAnimate> = {
  component: FabButtonAnimate,
  title: "Animate/FabButtonAnimate",
};

export default Component;

export const Default = {
  args: {
    childre: "",
    sxWrap: {
        background: 'white',
        width: 200,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    size: "large",
    sx: {
        background: '#e0e0e0',
    },
    disabled: false,
    variant: 'outlined',
    disableRipple: false,
    disableTouchRipple: false,
    focusRipple: false,
  },
};
