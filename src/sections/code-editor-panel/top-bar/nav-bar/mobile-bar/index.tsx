import { type FC } from 'react'
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";

import Menu from "../options/menu";
import SmallScreenTabs from "../options/small-screen-tabs";

import { setTab } from "src/redux/slices/mobile-tab-manager";
import { useSelector } from 'src/redux/store';

const MobileBar: FC = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.mobileTabManager.activeTab)

  return (
    <Stack className="topBarTour" sx={STACK_STYLES}>
      <SmallScreenTabs
        index={activeTab}
        onChangeIndex={(value) => {
          dispatch(setTab(value))
        }}
      />

      <Menu />
    </Stack>
  );
};

const STACK_STYLES = {
  width: "100%",
  height: "25px",
  direction: "row",
  alignItems: "center",
  position: "relative",
}

export default MobileBar;
