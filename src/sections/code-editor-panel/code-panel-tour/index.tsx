import { useEffect, useState } from "react";

import { differenceInSeconds } from "date-fns";
import JoyRide, {
  ACTIONS,
  type CallBackProps,
  EVENTS,
  STATUS,
} from "react-joyride";
import { useDispatch } from "react-redux";

import { useMediaQuery, useTheme } from "@mui/material";

import { setStartTour } from "src/redux/slices/tour";
import { useSelector } from "src/redux/store";

import { TOUR_STEPS_DECKTOP, TOUR_STEPS_MOBILE } from "./config";
import TooltipTourCodePanel from "./tour-tooltip";

const MS_IN_SECOND = 2592000;
const STATUSES: string[] = [STATUS.FINISHED, STATUS.PAUSED, STATUS.SKIPPED];

export const CodePanelTour = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up(1000));
  const [slideIndex, setSlideIndex] = useState(0);
  const isTourStarted = useSelector((state) => state.tour.isStarted);
  const userCreated = useSelector((state) => state.global.user?.createdAt);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;
    if (STATUSES.includes(status as string) && isTourStarted) {
      dispatch(setStartTour(false));
      setSlideIndex(0);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setSlideIndex(Number(index) + Number(action === ACTIONS.PREV ? -1 : 1));
    }
  };

  useEffect(() => {
    const isShowedTour = localStorage.getItem("SHOWED_TOUR");

    if (isShowedTour) {
      return;
    }

    if (userCreated) {
      const isTourShouldBeStopped =
        differenceInSeconds(new Date(), new Date(userCreated)) / MS_IN_SECOND >
        1;

      if (isTourShouldBeStopped) {
        dispatch(setStartTour(false));
      }
    }

    setTimeout(() => {
      dispatch(setStartTour(true));
      localStorage.setItem("SHOWED_TOUR", "true");
    }, 3000);
  }, [userCreated, isTourStarted, dispatch]);

  return (
    <JoyRide
      callback={handleJoyrideCallback}
      run={isTourStarted}
      tooltipComponent={TooltipTourCodePanel}
      steps={isDesktop ? TOUR_STEPS_DECKTOP : TOUR_STEPS_MOBILE}
      showSkipButton={false}
      showProgress
      stepIndex={slideIndex}
      styles={JOY_RIDE_OPTIONS}
    />
  );
};

const JOY_RIDE_OPTIONS = { options: { zIndex: 10000 } };

export default CodePanelTour;
