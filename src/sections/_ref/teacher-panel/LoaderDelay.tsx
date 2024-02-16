import { useEffect, useState } from "react";

interface Props {
  deley: number;
  isLoading: boolean;
  skeleton: React.ReactElement;
  component: React.ReactElement;
}

export default function LoaderDelay({
  deley,
  isLoading,
  component,
  skeleton,
}: Props): React.ReactElement {
  const [isExist, setIsExist] = useState<boolean>(true);
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsExist(false);
      }, deley);
    }
    if (!isLoading) {
      setIsExist(true);
    }
  }, [isLoading]);
  return <>{isExist ? component : skeleton}</>;
}
