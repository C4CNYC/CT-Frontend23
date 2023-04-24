import LoadingScreen from "@components/loading-screen/LoadingScreen";
import { useEffect, useState } from "react";

interface Props {
  deley: number;
  isFetching: boolean;
}

export default function LoaderDeleyContent({
  deley,
  isFetching,
}: Props): React.ReactElement {
  const [isExist, setIsExist] = useState<boolean>(true);
  useEffect(() => {
    if (isFetching) {
      setTimeout(() => setIsExist(false), deley);
    }
    if (!isFetching) {
      setIsExist(true);
    }
  }, [isFetching]);
  return (
    <>
      {isExist ? (
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
      ) : null}
    </>
  );
}
