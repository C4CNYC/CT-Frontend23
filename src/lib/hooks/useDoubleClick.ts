import { useCallback, useRef } from "react";

// ----------------------------------------------------------------------

interface Props {
  timeout?: number;
  click?: (e: React.SyntheticEvent) => void;
  doubleClick: (e: React.SyntheticEvent) => void;
}

export function useDoubleClick({
  click,
  doubleClick,
  timeout = 250,
}: Props): React.ReactElement | null {
  const clickTimeout = useRef<any>();

  const clearClickTimeout = (): void => {
    if (clickTimeout) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      clearClickTimeout();
      if (click && event.detail === 1) {
        clickTimeout.current = setTimeout(() => {
          click(event);
        }, timeout);
      }
      if (event.detail % 2 === 0) {
        doubleClick(event);
      }
    },
    [click, doubleClick, timeout]
  );
}
