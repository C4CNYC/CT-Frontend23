import { useEffect, useState } from "react";

import { useScroll } from "framer-motion";

// ----------------------------------------------------------------------

type ReturnType = boolean;

interface UseScrollOptions extends Omit<ScrollOptions, "container" | "target"> {
  container?: React.RefObject<HTMLElement>;
  target?: React.RefObject<HTMLElement>;
}

export function useOffSetTop(
  top = 100,
  options?: UseScrollOptions
): ReturnType {
  const { scrollY } = useScroll(options);

  const [value, setValue] = useState(false);

  useEffect(
    () =>
      scrollY.onChange((scrollHeight) => {
        if (scrollHeight > top) {
          setValue(true);
        } else {
          setValue(false);
        }
      }),
    [scrollY, top]
  );

  return value;
}

// Usage
// const offset = useOffSetTop(100);

// Or
// const offset = useOffSetTop(100, {
//   container: ref,
// });
