import { EmptyContent } from "@ct-nx/components";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useGetCourseQuery } from "src/redux/services/student/courses-manager";
import { useGetPublicCourseQuery } from "src/redux/services/student/public-student";
import CoursesItem from "./course-list-item/CourseItem";
import SkeletonCourse from "./course-list-item/SkeletonCourse";

interface Props {
  publicPage?: boolean;
  setCounter?: (count: number) => void;
  setIsLoading?: (loading: boolean) => void;
}

export default function CourseList({
  publicPage,
  setCounter,
  setIsLoading,
}: Props): React.ReactElement {
  const { data, isLoading } = useGetCourseQuery(
    { take: 5 },
    { skip: publicPage }
  );
  const { data: publicData, isLoading: publicIsLoading } =
    useGetPublicCourseQuery({}, { skip: !publicPage });
  useEffect(() => {
    setIsLoading?.(publicPage ? publicIsLoading : isLoading);
  }, [isLoading]);
  if (data) {
    setCounter?.(data.data.length);
  }
  return (
    <Stack direction="column" gap={3} sx={{ pb: 4 }}>
      {publicPage ? (
        publicIsLoading ? (
          <>
            <SkeletonCourse />
            <SkeletonCourse />
          </>
        ) : publicData?.data?.length ? (
          publicData?.data?.map((el) => (
            <CoursesItem course={el} key={el.course_id} />
          ))
        ) : (
          <EmptyContent title="You dont have any course" />
        )
      ) : isLoading ? (
        <>
          <SkeletonCourse />
          <SkeletonCourse />
        </>
      ) : data?.data?.length ? (
        data?.data?.map((el) => <CoursesItem course={el} key={el.course_id} />)
      ) : (
        <EmptyContent title="You dont have any course" />
      )}
    </Stack>
  );
}
