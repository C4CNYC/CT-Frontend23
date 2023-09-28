import { useAtom } from "jotai";
import { ImBook } from "react-icons/im";
import { LuMonitorUp } from "react-icons/lu";

import { Button } from "@mui/material";

import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";

export default function HidedTabBtn() {
  const [{ isBrowserHidden, isInstructionsHidden }, setGlobalCodePanel] =
    useAtom(globalCodePanelAtom);
  return (
    <>
      {isInstructionsHidden ? (
        <Button
          sx={{
            position: "absolute",
            top: 40,
            left: 0,
            minWidth: "0",
            p: 1,
            background: "rgba(251, 221, 63, .7)",
            zIndex: 10,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            color: "#5FD0D5",
            "&:hover": {
              background: "rgb(251, 221, 63)",
            },
          }}
          onClick={() => {
            setGlobalCodePanel((prev) => ({
              ...prev,
              isInstructionsHidden: false,
            }));
          }}
        >
          <ImBook size={20} />
        </Button>
      ) : null}
      {isBrowserHidden ? (
        <Button
          sx={{
            position: "absolute",
            top: 40,
            right: 0,
            minWidth: "0",
            p: 1,
            background: "rgba(251, 221, 63, .7)",
            zIndex: 10,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            color: "#5FD0D5",
            "&:hover": {
              background: "rgb(251, 221, 63)",
            },
          }}
          onClick={() => {
            setGlobalCodePanel((prev) => ({
              ...prev,
              isBrowserHidden: false,
            }));
          }}
        >
          <LuMonitorUp size={20} />
        </Button>
      ) : null}
    </>
  );
}
