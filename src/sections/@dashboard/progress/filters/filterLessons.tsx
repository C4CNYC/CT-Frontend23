import { useFilters } from "@hooks/useFilters";
import { Autocomplete, TextField } from "@mui/material";
import {
  ILesson,
  IModule,
} from "src/redux/services/interfaces/courseUnits.interface";
import { useGetLessonQuery } from "src/redux/services/manager/lessons-manager";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type LessonType = ILesson & BaseResponseInterface;

export default function FilterLessonsAutocomplete(): React.ReactElement {
  const { filters: lessonsFilters, setFilter: setLessonsFilters } =
    useFilters<LessonType>({
      data: [],
      active: false,
      name: "",
      description: "",
      meta: "",
      id: "",
      createdAt: "",
      updatedAt: "",
    });
  const { data: lesson } = useGetLessonQuery(lessonsFilters);
  return (
    <>
      <Autocomplete<IModule & BaseResponseInterface>
        options={lesson?.data ?? []}
        renderInput={(params) => <TextField {...params} label="Module" />}
        onInputChange={(e, value) => {
          setLessonsFilters("name", value);
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
