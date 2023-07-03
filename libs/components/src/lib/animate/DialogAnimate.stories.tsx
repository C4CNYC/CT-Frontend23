import type { Meta } from "@storybook/react";
import { DialogAnimate, DialogAnimateProps } from "./DialogAnimate";
import { useEffect, useState } from "react";
import { varFade } from "./variants";
import { Button, styled, Box } from "@mui/material";
import { voidFunction } from "@ct-nx/utils";

const Component: Meta<typeof DialogAnimate> = {
  component: DialogAnimate,
  title: "Animate/DialogAnimate",
};

export default Component;

const StyledDialog = styled(DialogAnimate)(() => ({
  ".MuiBox-root": {
    opacity: '1 !important'
  }
}));

const ExampleComponent = ({open, ...props}: DialogAnimateProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const onChange = () => {
    setIsOpen(state => !state)
  }

  const onClose = () => {
    setIsOpen(state => !state)
  }

  return (
    <>
      <Button variant="contained" onClick={onChange}>Open Dialog Animate</Button>
      <StyledDialog 
      {...props}
      open={isOpen}
      onClose={onClose}
      >
        <Box
          sx={{
            padding: 4
          }}
        >
          Some dialog content
        </Box>
      </StyledDialog>
    </>
  )
}

export const Default: Meta<typeof DialogAnimate> = {
  render: (args) => <ExampleComponent {...args} />,
  args: {
    open: false,
    onClose: voidFunction,
    variants: varFade({
      distance: 0,
      durationIn: 0.32,
      durationOut: 0.24,
      easeIn: "easeInOut",
    }).inUp,
  },
};
