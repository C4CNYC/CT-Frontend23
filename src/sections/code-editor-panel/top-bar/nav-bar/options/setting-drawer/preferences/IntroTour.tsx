import { Button } from "@mui/material";

import { useTranslate } from "src/utils/translateHelper";

import BasePreference from "./BasePreference";

interface IIntroTour {
  onStartIntro: () => void;
}

const IntroTour = ({ onStartIntro }: IIntroTour): React.ReactElement => {
  const translate = useTranslate();

  return (
    <BasePreference title={translate("intro_tour")}>
      <Button onClick={onStartIntro} fullWidth variant="contained">
        {translate("launch_intro_tour")}
      </Button>
    </BasePreference>
  );
};

export default IntroTour;
