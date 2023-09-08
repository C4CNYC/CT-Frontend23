import { useAtom } from "jotai";

import { Stack } from "@mui/system";

import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";

import ChatPopup from "./options/ChatPopUp";
import ViewTumbler from "./options/ViewTumbler";
import HelpPopup from "./options/help-popup";
import Menu from "./options/menu";
import SettingDrawer from "./options/setting-drawer";
import Timer from "./options/timer/timer";

interface IDesktopBar {
  chatComponent: React.ReactElement;
}

const DesktopBar = ({ chatComponent }: IDesktopBar): React.ReactElement => {
  const [
    {
      isBrowserHidden,
      isInstructionsHidden,
      isFullScreenView,
      fullScreenClose,
      fullScreenOpen,
    },
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
        isColumnHidden={isBrowserHidden || isInstructionsHidden}
        onChangeColumnVisability={(value) => {
          setGlobalCodePanel((prev) => ({
            ...prev,
            isBrowserHidden: value,
            isInstructionsHidden: value,
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
