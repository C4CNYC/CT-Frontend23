import { useEffect, useRef } from "react";

const useDebounceCallback = (
  delay = 0,
  cleaning = true
): ((callback: () => void) => void) => {
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (cleaning) {
      return () => {
        if (ref.current) clearTimeout(ref.current);
      };
    }
  }, [cleaning]);

  return (callback: () => void) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = window.setTimeout(callback, delay);
  };
};
export default useDebounceCallback;
