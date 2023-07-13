import { useEffect, useState } from "react";

import { LoadingScreen } from "../loading-screen";

interface Props {
  deley: number;
  isFetching: boolean;
}

export function LoaderDeleyContent({
  deley,
  isFetching,
}: Props): React.ReactElement {
  const [isExist, setIsExist] = useState<boolean>(true);
  useEffect(() => {
    if (isFetching) setIsExist(true);
    setTimeout(() => {
      setIsExist(false);
    }, deley);
  }, [isFetching]);

  if (isExist) {
    return (
      <LoadingScreen
        sx={{
          position: "absolute",
          zIndex: 1000,
          animation: isExist ? "1.5s hide 1.5s forwards" : "",
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
    );
  }

  return <></>;
}
