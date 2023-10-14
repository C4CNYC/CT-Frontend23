import { type FC, type ReactNode } from 'react'
import dynamic from "next/dynamic";

import { Stack } from "@mui/system";

import ProgressBottomBar, { type ProgressBottomBarProps } from "./progress-bottom-bar";
import type { MenuProps } from './menu';

const Menu = dynamic(async () => await import("./menu"));

export interface BottomBarProps extends ProgressBottomBarProps,
MenuProps {
  lessonManagerComponent: ReactNode
}

const STACK_STYLES = {
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "center"
}

const BottomBar: FC<BottomBarProps> = ({
  publicPage = false,
  sliderSteps,
  code,
  language,
  lessonManagerComponent
}) => {
  return (
    <Stack
      pl="20px"
      pr="20px"
      height="55px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
    >
      {lessonManagerComponent}

      <Stack
        spacing={2}
        direction="row"
        sx={STACK_STYLES}
      >
        <ProgressBottomBar sliderSteps={sliderSteps} />

        <Menu
          code={code}
          language={language}
          publicPage={publicPage}
        />
      </Stack>
    </Stack>
  );
};

export default BottomBar;
