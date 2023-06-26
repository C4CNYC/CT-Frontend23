import { Stack } from "@mui/system";
import LessonsManager from "./LessonsManager";
import Menu from "./Menu";
import ProgressBottomBar from "./ProgressBottomBar";

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
