import { m } from "framer-motion";
import type { Meta } from "@storybook/react";
import { MotionContainer } from "./MotionContainer";
import { varBounce } from "./variants";
import { ForbiddenIllustration } from "../../illustrations";

const Component: Meta<typeof MotionContainer> = {
  component: MotionContainer,
  title: "Animate/MotionContainer",
};

export default Component;

export const Default = {
  args: {
    animate: true,
    action: true,
    children: <>
        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
    </>
  },
};
