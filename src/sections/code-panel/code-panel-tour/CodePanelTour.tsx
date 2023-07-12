import { 
  useState,
  useEffect, 
} from "react";
import JoyRide, { 
  EVENTS, 
  STATUS,
  ACTIONS, 
} from "react-joyride";
import { useAtom } from "jotai";
import { differenceInSeconds } from "date-fns";

import { 
  useTheme,
  useMediaQuery, 
} from "@mui/material";

import { startTour } from "./tour-atom";
import { useSelector } from "src/redux/store";
import { TooltipTourCodePanel } from "./TourTooltip";
import { TOUR_STEPS_DECKTOP, TOUR_STEPS_MOBILE } from "./TourSteps";

export default function CodePanelTour(): React.ReactElement {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [{ start }, setStartTour] = useAtom(startTour);
  const userCreated: string | undefined = useSelector(
    (state) => state.global.user?.createdAt
  );
  const handleJoyrideCallback = (data: any) => {
    const { action, index, status, type } = data;
    if (
      [STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED].includes(status) &&
      start
    ) {
      setStartTour({ start: false });
      setSlideIndex(0);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setSlideIndex(Number(index) + Number(action === ACTIONS.PREV ? -1 : 1));
    }
  };

  useEffect(() => {
    const showedTour = localStorage.getItem("SHOWED_TOUR");
    if (!showedTour) {
      if (userCreated) {
        if (
          differenceInSeconds(new Date(), new Date(userCreated)) / 2592000 >
          1
        ) {
          setStartTour({ start: false });
        }
      }
      setStartTour({ start: true });
      localStorage.setItem("SHOWED_TOUR", "true");
    }
  }, [userCreated, start]);

  return (
    <JoyRide
      callback={handleJoyrideCallback}
      run={start}
      tooltipComponent={TooltipTourCodePanel}
      steps={isDesktop ? TOUR_STEPS_DECKTOP : TOUR_STEPS_MOBILE}
      showSkipButton={false}
      showProgress
      stepIndex={slideIndex}
      styles={{ options: { zIndex: 10000 } }}
    />
  );
}
