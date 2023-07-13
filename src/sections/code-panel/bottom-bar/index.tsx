// import { LessonsManager } from "./LessonsManager";
// import Menu from "./Menu";
import dynamic from "next/dynamic";

import { Stack } from "@mui/system";

import ProgressBottomBar from "./ProgressBottomBar";

const Menu = dynamic(async () => await import("./Menu"));
const LessonsManager = dynamic(async () => await import("./LessonsManager"));
const BottomBar = (): React.ReactElement => {
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
      <LessonsManager />
      <Stack
        spacing={2}
        direction="row"
        sx={{ width: "100%", justifyContent: "flex-end", alignItems: "center" }}
      >
        <ProgressBottomBar />
        <Menu />
      </Stack>
    </Stack>
  );
};

export default BottomBar;
