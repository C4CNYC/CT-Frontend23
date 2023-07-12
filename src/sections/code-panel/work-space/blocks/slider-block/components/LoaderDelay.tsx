import { useEffect, useState } from "react";

import { LoadingScreen } from "@components";

interface Props {
  deley: number;
  isLoading: boolean;
}

export default function LoaderDelay({
  deley,
  isLoading,
}: Props): React.ReactElement {
  const [isExist, setIsExist] = useState<boolean>(true);
  useEffect(() => {
    setIsExist(true);
    setTimeout(() => {
      setIsExist(false);
    }, deley);
  }, [isLoading]);
  return (
    <>
      {isExist ? (
        <LoadingScreen
          sx={{
            position: "absolute",
            zIndex: 1,
            animation: isExist ? "1.5s hide 2.5s forwards" : "",
            "@keyframes hide": {
              "0%": {
                opacity: 1,
              },
              "100%": {
                opacity: 0,
              },
            },
          }}
        />
      ) : null}
    </>
  );
}
