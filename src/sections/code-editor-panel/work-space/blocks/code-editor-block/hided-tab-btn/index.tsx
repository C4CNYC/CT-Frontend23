import { type FC } from "react"
import { useDispatch } from "react-redux";
import { ImBook } from "react-icons/im";
import { LuMonitorUp } from "react-icons/lu";

import { Button } from "@mui/material";

import { useSelector } from "src/redux/store";
import { toggleBrowser, toggleInstrations } from "src/redux/slices/code-panel-global";

import { LEFT_BUTTON_SX, RIGHT_BUTTON_SX } from "./constants"

const HidedTabBtn: FC = () => {
  const dispatch = useDispatch()
  const isBrowserHidden = useSelector((state) => state.codePanelGlobal.isBrowserHidden)
  const isInstructionsHidden = useSelector((state) => state.codePanelGlobal.isInstructionsHidden)

  return (
    <>
      {isInstructionsHidden && (
        <Button
          sx={LEFT_BUTTON_SX}
          onClick={() => {
            dispatch(toggleInstrations(false))
          }}
        >
          <ImBook size={20} />
        </Button>
      )}

      {isBrowserHidden && (
        <Button
        sx={RIGHT_BUTTON_SX}
        onClick={() => {
          dispatch(toggleBrowser(false))
        }}
      >
        <LuMonitorUp size={20} />
      </Button>
      )}
    </>
  );
}

export default HidedTabBtn;
