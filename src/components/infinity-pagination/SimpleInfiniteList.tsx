import { type ReactNode, type FC } from "react";

import useInfiniteScroll from "react-infinite-scroll-hook";

import { Box } from "@mui/system";

export interface SimpleInfiniteListProps {
  onLoadMore: () => void;
  hasNextPage: boolean;
  children: ReactNode;
  loading: boolean;
  loaderComponent?: ReactNode
}

export const SimpleInfiniteList: FC<SimpleInfiniteListProps> = ({
  onLoadMore,
  hasNextPage,
  children,
  loading,
  loaderComponent
}) => {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <>
      {children}
      {hasNextPage && (
        <Box
          height="50px"
          justifyContent="center"
          alignItems="center"
          display="flex"
          ref={sentryRef}
        >
            {loaderComponent}
        </Box>
      )}
    </>
  );
}
