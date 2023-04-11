import { useFilters, FilterMode } from "@hooks/useFilters";
import { Stack } from "@mui/system"
import FilterClassesAutocomplete from "./filters/Classes";
import FilterCoursesAutocomplete from "./filters/Courses";
import { ProgressChart } from "./ProgressChart";

interface IProgressFilters {
  courseId: string;
  moduleId: string;
  lessonId: string;
  classId: string;
}

export const ProgressSection = (): React.ReactElement => {
  const { filters, setFilter } = useFilters<IProgressFilters>({
    courseId: "",
    moduleId: "",
    lessonId: "",
    classId: ""
  }, FilterMode.global)

  return (
    <>
      <Stack direction="row" spacing={2}>
        <FilterCoursesAutocomplete
          courseId={filters.courseId}
          setCourse={(courseId: string) => { setFilter("courseId", courseId); }}
        />
        <FilterClassesAutocomplete
          classId={filters.classId}
          setClass={(classId: string) => { setFilter("classId", classId) }}
        />
      </Stack>
      <ProgressChart
        classId={filters.classId}
        courseId={filters.courseId}
      />
    </>
  )
}
