import type { Meta } from "@storybook/react";
import { TextAnimate } from "./TextAnimate";

const Component: Meta<typeof TextAnimate> = {
  component: TextAnimate,
  title: "Animate/TextAnimate",
};

export default Component;

export const Default = {
  args: {
    text: "TextAnimate",
  },
};
