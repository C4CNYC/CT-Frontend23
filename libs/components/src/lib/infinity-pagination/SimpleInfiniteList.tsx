import { Box } from "@mui/system";
import React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

interface Props {
  onLoadMore: () => void;
  hasNextPage: boolean;
  children: React.ReactNode;
  loading: boolean;
}

export function SimpleInfiniteList({
  onLoadMore,
  hasNextPage,
  children,
  loading,
}: Props): React.ReactElement {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    rootMargin: "0px 0px 400px 0px",
  });
  return (
    <>
      {children}
      {hasNextPage && <Box height="50px" ref={sentryRef} />}
    </>
  );
}
