import { EmptyContent } from "@ct-nx/components";
import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useGetModulesListQuery } from "src/redux/services/student/modules-student";
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
  const { data, isLoading } = useGetModulesListQuery({ take: 5 });
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);
  if (data) {
    setCounter(data.data.length);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {isLoading ? (
        <Stack
          direction="row"
          sx={{
            width: "100%",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {Array(5)
            .fill(null)
            .map((el, i) => (
              <SkeletonModule key={i + 34} />
            ))}
        </Stack>
      ) : data?.data?.length ? (
        data.data?.map((el, i) => <ModuleItem key={i} data={el} />)
      ) : (
        <Box width="100%">
          <EmptyContent title="You dont have any course" />
        </Box>
      )}
    </Box>
  );
}
