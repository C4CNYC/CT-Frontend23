import { useFilters } from "@hooks/useFilters";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/router";
import {
  ILesson,
  IModule,
} from "src/redux/services/interfaces/courseUnits.interface";
import { useGetLessonContentQuery } from "src/redux/services/manager/lesson-content-manager";
import {
  useGetLessonQuery,
  useGetLessonsQuery,
} from "src/redux/services/manager/lessons-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type LessonType = ILesson & BaseResponseInterface;

interface Props {
  lessonId: string;
}

export default function FilterLessonsAutocomplete({
  lessonId,
}: Props): React.ReactElement {
  const { data: lesson, isLoading: isLessonLoading } = useGetLessonQuery(
    { id: lessonId },
    { skip: !lessonId }
  );
  const { data, isLoading } = useGetLessonContentQuery(
    { lessonId },
    { skip: !lessonId }
  );

  return (
    <>
      <Autocomplete<IModule & BaseResponseInterface>
        options={data?.data ?? []}
        renderInput={(params) => <TextField {...params} label="Module" />}
        onInputChange={(e, value) => {
          setModuleFilters("name", value);
        }}
        getOptionLabel={(option) => option.name}
        sx={{
          width: { xs: "100%", sm: "100%", md: "260px", lg: "260px" },
          marginRight: 2,
        }}
      />
    </>
  );
}
