import { useAtom } from "jotai";

import { Stack } from "@mui/system";

import Menu from "./options/menu";
import Timer from "./options/timer/timer";
import ChatPopup from "./options/ChatPopUp";
import HelpPopup from "./options/help-popup";
import ViewTumbler from "./options/ViewTumbler";
import SettingDrawer from "./options/setting-drawer";
import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";

interface IDesktopBar {
  chatComponent: React.ReactElement;
}

const DesktopBar = ({ chatComponent }: IDesktopBar): React.ReactElement => {
  const [
    { isAllColumnsVisible, isFullScreenView, fullScreenClose, fullScreenOpen },
    setGlobalCodePanel,
  ] = useAtom(globalCodePanelAtom);

  return (
    <Stack
      className="topBarTour"
      spacing={1}
      direction="row"
      alignItems="center"
    >
      <Timer mobile={false} />
      <HelpPopup />
      <ChatPopup chatComponent={chatComponent} />
      <SettingDrawer />
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
  );
};

export default DesktopBar;
