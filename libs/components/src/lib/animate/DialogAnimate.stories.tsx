import type { Meta } from "@storybook/react";
import { DialogAnimate } from "./DialogAnimate";

const Component: Meta<typeof DialogAnimate> = {
  component: DialogAnimate,
  title: "Animate/DialogAnimate",
};

export default Component;

export const Default = {
  args: {
    open: true,
    onClose: () => {},
    children: <>DialogAnimate</>
  },
};
