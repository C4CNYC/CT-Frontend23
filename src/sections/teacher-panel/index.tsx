import { Stack } from "@mui/system";

import { ResizerUi } from "@components";

import { TopBar } from "./top-bar";
import { CodePanel } from "./code-panel";
import { QuickRabbits } from "./quick-rabbits";

export const TeacherPanel = (): React.ReactElement => {
  return (
    <Stack>
      <TopBar />
      <Stack sx={{ position: "relative", height: "calc(100vh - 50px)" }}>
        <ResizerUi split="vertical" maxSize={-100} minSize={550} defaultSize={550}>
          <CodePanel />
          <QuickRabbits />
        </ResizerUi>
      </Stack>
    </Stack>
  );
};
