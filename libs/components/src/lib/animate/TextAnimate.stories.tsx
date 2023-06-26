import { m } from "framer-motion";
import type { Meta } from "@storybook/react";
import { TextAnimate } from "./TextAnimate";
import { varBounce } from "./variants";
import { ForbiddenIllustration } from "../../illustrations";

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
