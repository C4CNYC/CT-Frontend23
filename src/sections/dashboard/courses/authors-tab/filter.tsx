import {
  Skeleton,
  Autocomplete,
  InputAdornment,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

import { BaseResponseInterface } from "@utils";

import { SetFilterType, useFilters } from "@hooks";
import {
  ICourse,
  ICourseSearchParams,
} from "src/redux/services/interfaces/courseUnits.interface";
import { useGetCourseQuery } from "src/redux/services/manager/courses-manager";
import { IAuthorSearchParams } from "src/redux/services/interfaces/author.interface";

interface Props {
  courseId: string;
  setCourse: (courseId: string) => void;
}

export default function FilterModules({
  courseId,
  setCourse,
}: Props): React.ReactElement {
  const { filters: courseFilters, setFilter: setCourseFilters } =
    useFilters<ICourseSearchParams>({
      take: 50,
      name: "",
    });

  const { data: courses, isLoading } = useGetCourseQuery(courseFilters);
  const onChangeCourse = (
    event: React.SyntheticEvent<any>,
    newValue: (ICourse & BaseResponseInterface) | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ICourse & BaseResponseInterface>
  ): void => {
    if (details?.option.id === courseId) {
      return;
    }
    setCourse(details?.option.id as string);
  };
  if (isLoading) {
    return (
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ mr: 1, width: "80%", height: "56px" }}
      />
    );
  }

  return (
    <Autocomplete<ICourse & BaseResponseInterface>
      value={
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        (courseId && courses?.data.find((c) => c.id === courseId)) ||
        courses?.data[0]
      }
      options={courses?.data ?? []}
      renderInput={(params) => <TextField {...params} label="Course" />}
      onInputChange={(e, value) => {
        if (courses?.data.find((c) => c.id === courseId)?.name === value) {
          return;
        }
        setCourseFilters("name", value);
      }}
      onChange={onChangeCourse}
      getOptionLabel={(option) => option.name}
      disabled
      sx={{
        width: "80%",
        marginRight: 1,
      }}
    />
  );
}

interface PropsAuthors {
  filters: IAuthorSearchParams;
  setFilter: SetFilterType;
}

export function FilterAuthor({
  filters,
  setFilter,
}: PropsAuthors): React.ReactElement {
  return (
    <TextField
      defaultValue={filters?.email ?? ""}
      sx={{
        width: "100%",
        mb: 2,
      }}
      onChange={(event) => {
        setFilter("email", event.target.value);
      }}
      placeholder="email"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ cursor: "pointer" }}>
            <SearchOutlined />
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
}
