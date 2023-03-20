import { CircularProgress} from "@mui/material";
import { Box } from "@mui/system";
import React, { Children } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

const ARRAY_SIZE = 10;
const RESPONSE_TIME_IN_MS = 1000;

export interface Item {
  key: number;
  value: string;
}

interface Response {
  hasNextPage: boolean;
  data: Item[];
}

interface Props {
  onLoadMore: () => void;
  hasNextPage: boolean;
  children: React.ReactNode;
  loading: boolean;
}

function SimpleInfiniteList({
  onLoadMore,
  hasNextPage,
  children,
  loading,
}: Props) {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <Box>
      {children}
      {hasNextPage && (
        <Box ref={sentryRef}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
export default SimpleInfiniteList;
