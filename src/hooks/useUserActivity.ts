import { useEffect, useRef, useState } from "react";

const ACCEPTBLE_DELAY = 60000;
const SUBMIT_ACTIVITHY = 60000;

export const useUserActivity = ({
  onUpdateActivity,
}: {
  onUpdateActivity: () => void;
}): void => {
  useActive(onUpdateActivity);

  useEffect(() => {
    onUpdateActivity();
  }, []);
};

export function useActive(updateActivity: () => void): boolean {
  const [active, setActive] = useState(true);
  const timer = useRef<number>();
  const timerUpdate = useRef<any>();
  const events = ["keypress", "mousemove", "touchmove", "click", "scroll"];

  useEffect(() => {
    timerUpdate.current = setInterval(() => {
      if (!active) return;
      updateActivity();
    }, SUBMIT_ACTIVITHY);

    const handleEvent = (): void => {
      setActive(true);

      if (timer.current) {
        window.clearTimeout(timer.current);
      }

      if (!timerUpdate.current) {
        timerUpdate.current = setInterval(() => {
          if (!active) return;
          updateActivity();
        }, SUBMIT_ACTIVITHY);
      }

      timer.current = window.setTimeout(() => {
        clearInterval(timerUpdate.current);
        timerUpdate.current = null;
        setActive(false);
      }, ACCEPTBLE_DELAY);
    };

    events.forEach((event) => {
      document.addEventListener(event, handleEvent);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleEvent);
      });
    };
  }, []);

  return active;
}
