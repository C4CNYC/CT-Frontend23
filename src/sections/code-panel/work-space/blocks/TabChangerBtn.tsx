import { useAtom } from "jotai";
import { MdOutlineSwipeLeft, MdOutlineSwipeRight } from "react-icons/md";

import { Box, IconButton } from "@mui/material";

import { mobileTabManager } from "@sections/code-panel/atoms/mobile-tab-manager.atom";

interface Props {
  orientation: string;
}

export default function TabChangerBtn({
  orientation,
}: Props): React.ReactElement {
  const [{ activeTab }, setTab] = useAtom(mobileTabManager);

  const changeTab = (): void => {
    if (orientation === "left") {
      setTab({ activeTab: activeTab - 1 });
    } else {
      setTab({ activeTab: activeTab + 1 });
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "55%",
        right: orientation === "right" ? "0" : "",
        left: orientation === "left" ? "0" : "",
        width: "40px",
        height: "35px",
        borderRadius:
          orientation === "left" ? "0 20px 20px 0" : "20px 0 0 20px",
        background: "#EE467A33",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton onClick={changeTab}>
        {orientation === "left" ? (
          <MdOutlineSwipeRight
            size="20px"
            color="#EE467A"
            style={{ transform: "rotateZ(20deg)" }}
          />
        ) : (
          <MdOutlineSwipeLeft
            size="20px"
            color="#EE467A"
            style={{ transform: "rotateZ(-20deg)" }}
          />
        )}
      </IconButton>
    </Box>
  );
}
