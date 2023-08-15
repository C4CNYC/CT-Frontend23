import { useAtom } from "jotai";

import { Box, Stack } from "@mui/material";

import { Logo } from "@components";
import AccountPopover from "@layouts/dashboard/header/AccountPopover";

import { lessonViewAtom } from "../lesson-atoms/lesson-view-atom";
import Menu from "./Menu";
import ViewTumbler from "./ViewTumbler";

export default function LessonTopBar(): React.ReactElement {
  const [
    { isAllColumnsVisible, isFullScreenView, fullScreenClose, fullScreenOpen },
    setGlobalCodePanel,
  ] = useAtom(lessonViewAtom);
  return (
    <Stack
      direction="row"
      sx={{
        py: 1,
        px: 2,
        alignItems: "center",
        justifyContent: "space-between",
        maxHeight: "48px",
        boxShadow: 2,
      }}
    >
      <Logo />
      <Stack direction="row" gap={2}>
        <Box display="flex" alignItems="center">
          <AccountPopover />
        </Box>
        <ViewTumbler
          fullScreenOpen={fullScreenOpen}
          fullScreenClose={fullScreenClose}
          fullScreenView={isFullScreenView}
          allColumnsVisible={isAllColumnsVisible}
          onChangeColumnVisability={(value) => {
            setGlobalCodePanel((prev) => ({
              ...prev,
              isAllColumnsVisible: value,
            }));
          }}
          onChangeSreenView={(value) => {
            setGlobalCodePanel((prev) => ({
              ...prev,
              isFullScreenView: value,
            }));
          }}
        />
        <Menu />
      </Stack>
    </Stack>
  );
}
