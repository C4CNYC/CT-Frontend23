import { useState } from "react";

import { useTranslate } from "src/utils/translateHelper";

//
import { SvgColor } from "../../svg-color";
import { StyledCard } from "../styles";

// ----------------------------------------------------------------------

export default function FullScreenOptions(): React.ReactElement {
  const [fullscreen, setFullscreen] = useState(false);
  const translate = useTranslate();

  const onToggleFullScreen = async (): Promise<void> => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <StyledCard
      selected={fullscreen}
      onClick={onToggleFullScreen}
      sx={{
        height: 48,
        typography: "subtitle2",
        "& .svg-color": {
          ml: 1,
          width: 16,
          height: 16,
        },
      }}
    >
      {fullscreen ? translate("fullscreen_exit") : translate("fullscreen")}

      <SvgColor
        src={`/assets/icons/setting/${
          fullscreen ? "ic_exit_full_screen" : "ic_full_screen"
        }.svg`}
      />
    </StyledCard>
  );
}
