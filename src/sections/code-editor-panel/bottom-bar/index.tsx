import dynamic from "next/dynamic";
import { type FC, type ReactNode } from "react";

import { Stack } from "@mui/system";

import { useSelector } from "src/redux/store";

import type { MenuProps } from "./menu";
import ProgressBottomBar, {
  type ProgressBottomBarProps,
} from "./progress-bottom-bar";

const Menu = dynamic(async () => await import("./menu"));

export interface BottomBarProps extends ProgressBottomBarProps, MenuProps {
  lessonManagerComponent: ReactNode;
}

const STACK_STYLES = {
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "center",
};

const BottomBar: FC<BottomBarProps> = ({
  publicPage = false,
  sliderSteps,
  code,
  language,
  lessonManagerComponent,
}) => {
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab);
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

      <Stack spacing={2} direction="row" sx={STACK_STYLES}>
        {activeTab === 0 ? (
          <ProgressBottomBar sliderSteps={sliderSteps} />
        ) : null}

        <Menu code={code} language={language} publicPage={publicPage} />
      </Stack>
    </Stack>
  );
};

export default BottomBar;
