import { Box } from "@mui/material";

import { SkeletonProjectItem } from "@sections/main/skeletonsMain";
import { ICourseElement } from "src/redux/interfaces/content.interface";

import ProjectItem from "./projectItem";

interface Props {
  data: ICourseElement[] | undefined;
  isLoading: boolean;
}

const GET_COURSES = 2;
export default function ProejctList({
  data,
  isLoading,
}: Props): React.ReactElement {
  return (
    <Box
      gap={2}
      sx={{
        display: "flex",
        flexDirection: { md: "row" },
        justifyContent: { xs: "center", sm: "center", md: "flex-start" },
        flexWrap: "wrap",
        gap: 4,
      }}
    >
      {isLoading
        ? Array(GET_COURSES)
            .fill(null)
            .map((el, i) => <SkeletonProjectItem key={i} />)
        : data?.map((course, i) => (
            <ProjectItem key={course.id} course={course} />
          ))}
    </Box>
  );
}
