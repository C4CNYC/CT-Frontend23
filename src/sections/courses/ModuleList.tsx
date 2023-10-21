import { useEffect } from "react";

import { Box, Stack } from "@mui/material";

import { EmptyContent, SimpleInfiniteList } from "@components";
import { DEFAULT_TAKE_PER_PAGE, FilterMode, useFilters } from "@hooks";
import { getCountTakingElment } from "@utils";
import { IModulesSearchParams } from "src/redux/interfaces/content.interface";
import { useGetModulesListQuery } from "src/redux/services/manager/modules-student";

import ModuleItem from "./module-list-item/ModuleItem";
import SkeletonModule from "./module-list-item/SkeletonModule";

interface Props {
  setCounter: (count: number) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function ModuleList({
  setCounter,
  setIsLoading,
}: Props): React.ReactElement {
  const { filters, setFilter } = useFilters<IModulesSearchParams>(
    {
      name: "",
      take: DEFAULT_TAKE_PER_PAGE,
    },
    FilterMode.global
  );
  const { data, isLoading, isFetching } = useGetModulesListQuery(filters);
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  if (data) {
    setCounter(data.data.length);
  }

  if (isLoading) {
    <Stack
      direction="row"
      sx={{
        width: "100%",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {Array(DEFAULT_TAKE_PER_PAGE)
        .fill(null)
        .map((el, i) => (
          <SkeletonModule key={i + 33} />
        ))}
    </Stack>;
  }
  return (
    <SimpleInfiniteList
      hasNextPage={data?.meta.hasNextPage ?? false}
      onLoadMore={() => {
        if (data?.meta.take !== Number(filters?.take)) return;
        setFilter("take", Number(filters.take) + 10);
      }}
      loading={isLoading ?? isFetching}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {data?.data?.map((el) => (
          <ModuleItem key={el.id} data={el} />
        ))}
        {isFetching
          ? Array(
              getCountTakingElment(
                Number(data?.meta.itemCount),
                Number(filters.take)
              )
            )
              .fill(null)
              .map((v, i) => <SkeletonModule key={i} />)
          : null}
        {!isLoading && !isFetching && !data?.data.length ? (
          <Box width="100%">
            <EmptyContent title="You dont have any course" />
          </Box>
        ) : null}
      </Box>
    </SimpleInfiniteList>
  );
}
