import React from "react";

import useInfiniteScroll from "react-infinite-scroll-hook";

import { Box } from "@mui/system";

export interface SimpleInfiniteListProps {
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
}: SimpleInfiniteListProps): React.ReactElement {
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
