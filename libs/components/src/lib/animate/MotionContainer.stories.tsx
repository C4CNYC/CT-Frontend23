import { m } from "framer-motion";
import type { Meta } from "@storybook/react";
import { Typography, Button } from "@mui/material"
import { MotionContainer, MotionContainerProps } from "./MotionContainer";
import { varBounce } from "./variants";
import { useEffect, useState } from "react";

const Component: Meta<typeof MotionContainer> = {
  component: MotionContainer,
  title: "Animate/MotionContainer",
};

export default Component;

const ExampleComponent = ({animate, action, ...props}: MotionContainerProps) => {
  return (
    <>
      <MotionContainer
        {...props}
      >
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Some Motion Container Content
          </Typography>
        </m.div>

      </MotionContainer>
    </>
  )
}

export const Default: Meta<typeof MotionContainer> = {
  render: (args) => <ExampleComponent {...args} />,
  args: {
    animate: true,
    action: false,
    sx: {
      display: 'flex',
      justifyContent: 'center',
      position: "relative",
    }
  },
};
