import { type FC, useEffect, useState, useRef } from "react";

import { LoadingScreen } from "@components";

interface LoaderDelayProps {
  delay: number;
  isLoading: boolean;
}

const LoaderDelay: FC<LoaderDelayProps> = ({
  delay,
  isLoading,
}) => {
  const [isExist, setIsExist] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setIsExist(true);

    timeoutRef.current = setTimeout(() => {
      setIsExist(false);
    }, delay);
  }, [isLoading, delay]);

  useEffect(() => {
    return () => {
      clearInterval(timeoutRef.current);
    }
  }, [])

  if (!isExist) {
    return null
  }

  return (
    <LoadingScreen sx={LOADER_SCREEN_SX} />
  );
}

const LOADER_SCREEN_SX = {
  position: "absolute",
  zIndex: 1,
  animation: "1.5s hide 2.5s forwards",
  "@keyframes hide": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
}

export default LoaderDelay;
