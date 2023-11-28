import { type FC, type ReactNode } from "react";

import { useDispatch } from "react-redux";

import { Stack } from "@mui/system";

import {
  toggleBrowser,
  toggleInstrations,
} from "src/redux/slices/code-panel-global";
import { useSelector } from "src/redux/store";

import ChatPopup from "../options/chat-popup";
// import HelpPopup from "../options/help-popup";
import Menu from "../options/menu";
import SettingDrawer from "../options/setting-drawer";
import Timer from "../options/timer";
import ViewTumbler from "../options/view-tumbler";

interface IDesktopBar {
  chatComponent: ReactNode;
  onHanldeFullScreen: () => void;
  isFullScreenView: boolean;
}

const DesktopBar: FC<IDesktopBar> = ({
  chatComponent,
  onHanldeFullScreen,
  isFullScreenView,
}) => {
  const dispatch = useDispatch();
  const isBrowserHidden = useSelector(
    (state) => state.codePanelGlobal.isBrowserHidden
  );
  const isInstructionsHidden = useSelector(
    (state) => state.codePanelGlobal.isInstructionsHidden
  );

  const onChangeColumnVisability = (value: boolean) => {
    dispatch(toggleBrowser(value));
    dispatch(toggleInstrations(value));
  };

  return (
    <Stack
      className="topBarTour"
      spacing={1}
      direction="row"
      alignItems="center"
    >
      <Timer />
      {/* {Hide Help Popover before v1} */}
      {/* <HelpPopup /> */}

      <ChatPopup chatComponent={chatComponent} />

      <SettingDrawer />

      <ViewTumbler
        onHanldeFullScreen={onHanldeFullScreen}
        isFullScreenView={isFullScreenView}
        isColumnHidden={isBrowserHidden || isInstructionsHidden}
        onChangeColumnVisability={onChangeColumnVisability}
      />

      <Menu />
    </Stack>
  );
};

export default DesktopBar;
