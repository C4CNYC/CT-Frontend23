import type { Meta } from "@storybook/react";

import { Label } from "./Label";
import { Iconify } from "../iconify"

const Component: Meta<typeof Label> = {
  component: Label,
  title: "Label",
};

export default Component;

export const Default = {
  args: {
        color: "default",
        variant: "field",
        startIcon: <Iconify icon="mdi:arrow-left-bold" /> ,
        endIcon: <Iconify icon="mdi:arrow-right-bold" />,
        children: <>
            Label content
        </>
  },
};
