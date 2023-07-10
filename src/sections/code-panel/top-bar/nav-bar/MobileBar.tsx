import { useAtom } from "jotai";

import { Stack } from "@mui/system";

import Menu from "./options/menu";
import SmallScreenTabs from "./options/small-screen-tabs";
import { mobileTabManager } from "@sections/code-panel/atoms/mobile-tab-manager.atom";

const MobileBar = (): React.ReactElement => {
  const [{ activeTab }, setTab] = useAtom(mobileTabManager);

  return (
    <Stack
      className="topBarTour"
      sx={{
        width: "100%",
        height: "25px",
        direction: "row",
        alignItems: "center",
        position: "relative",
      }}
    >
      <SmallScreenTabs
        index={activeTab}
        onChangeIndex={(value) => {
          setTab({ activeTab: value });
        }}
      />
      <Menu />
    </Stack>
  );
};

export default MobileBar;
