import { EmptyContent } from "@ct-nx/components";
import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useGetLessonsListQuery } from "src/redux/services/student/lesson-student";
import LessonItem from "./lesson-list-item/lessonItem";
import SkeletonLesson from "./lesson-list-item/SkeletonLesson";

interface Props {
  setCounter: (count: number) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function LessonList({
  setCounter,
  setIsLoading,
}: Props): React.ReactElement {
  const { data, isLoading } = useGetLessonsListQuery({});
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
        alignItems: "flex-start",
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
              <SkeletonLesson key={i + 33} />
            ))}
        </Stack>
      ) : null}
      {!isLoading && data?.data?.length ? (
        data?.data?.map((el) => <LessonItem key={el.id} data={el} />)
      ) : (
        <Box width="100%">
          <EmptyContent title="You dont have any course" />
        </Box>
      )}
    </Box>
  );
}
