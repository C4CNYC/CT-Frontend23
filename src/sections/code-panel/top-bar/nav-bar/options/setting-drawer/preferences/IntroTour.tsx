import { Button } from "@mui/material";

import BasePreference from "./BasePreference";

interface IIntroTour {
  onStartIntro: () => void;
}

const IntroTour = ({ onStartIntro }: IIntroTour): React.ReactElement => {
  return (
    <BasePreference title="Intro Tour">
      <Button onClick={onStartIntro} fullWidth variant="contained">
        Launch Intro Tour
      </Button>
    </BasePreference>
  );
};

export default IntroTour;
