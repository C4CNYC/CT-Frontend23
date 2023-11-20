import { type FC } from "react";

import { TbArrowBarToLeft, TbArrowBarToRight } from "react-icons/tb";
import { useDispatch } from "react-redux";

import { Box, Button, Typography } from "@mui/material";

import {
  toggleBrowser,
  toggleInstrations,
} from "src/redux/slices/code-panel-global";
import { useSelector } from "src/redux/store";

import {
  COLLAPSEBAR_TITLE_SX,
  HIDE_BUTTON_SX,
  LEFT_BAR_SX,
  RIGHT_BAR_SX,
} from "./constants";

const HidedTabBtn: FC = () => {
  const dispatch = useDispatch();
  const isBrowserHidden = useSelector(
    (state) => state.codePanelGlobal.isBrowserHidden
  );
  const isInstructionsHidden = useSelector(
    (state) => state.codePanelGlobal.isInstructionsHidden
  );

  return (
    <>
      {isInstructionsHidden && (
        <Box
          onClick={() => {
            dispatch(toggleInstrations(false));
          }}
          sx={LEFT_BAR_SX}
        >
          <Button sx={HIDE_BUTTON_SX}>
            <TbArrowBarToRight size={20} />
          </Button>
          <Typography sx={COLLAPSEBAR_TITLE_SX}>Instruction</Typography>
        </Box>
      )}

      {isBrowserHidden && (
        <Box
          onClick={() => {
            dispatch(toggleBrowser(false));
          }}
          sx={RIGHT_BAR_SX}
        >
          <Button sx={HIDE_BUTTON_SX}>
            <TbArrowBarToLeft size={20} />
          </Button>
          <Typography sx={COLLAPSEBAR_TITLE_SX}>Browser Preview</Typography>
        </Box>
      )}
    </>
  );
};

export default HidedTabBtn;
