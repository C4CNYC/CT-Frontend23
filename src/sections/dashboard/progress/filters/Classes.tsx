import { useEffect } from "react";

import { useSelector } from "react-redux";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Skeleton,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";

import { useFilters } from "@hooks";
import { BaseResponseInterface } from "@utils";
import { IClass } from "src/redux/interfaces/class.interface";
import { ICourseSearchParams } from "src/redux/services/interfaces/courseUnits.interface";
import { useGetClassesQuery } from "src/redux/services/manager/classes-manager";
import { RootState } from "src/redux/store";
import { useTranslate } from "src/utils/translateHelper";

interface IFilterCoursesAutocomplete {
  classId: string;
  setClass: (classId: string) => void;
}

export default function FilterClassesAutocomplete({
  classId,
  setClass,
}: IFilterCoursesAutocomplete): React.ReactElement {
  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters: classesFilters, setFilter: setCourseFilters } =
    useFilters<ICourseSearchParams>({
      take: 50,
      name: "",
    });
  const { data: classes, isLoading } = useGetClassesQuery({
    schoolId,
    ...classesFilters,
  });

  const onChangeCourse = (
    event: React.SyntheticEvent<any>,
    newValue: (IClass & BaseResponseInterface) | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IClass & BaseResponseInterface>
  ): void => {
    if (details?.option.id === classId) {
      return;
    }
    setClass(details?.option.id as string);
  };

  const translate = useTranslate();
  useEffect(() => {
    if (!classes || classId) {
      return;
    }
    setClass(classes.data[0] ? classes.data[0].id : "");
  }, [classes]);

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          mr: "16px",
          width: "260px",
          height: "56px",
          borderRadius: "16px",
        }}
      />
    );
  }

  return (
    <>
      <Stack>
        <Autocomplete<IClass & BaseResponseInterface>
          value={
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            (classId && classes?.data.find((c) => c.id === classId)) ||
            classes?.data[0]
          }
          options={classes?.data ?? []}
          onChange={onChangeCourse}
          renderInput={(params) => (
            <TextField {...params} label={translate("class")} />
          )}
          onInputChange={(e, value) => {
            if (classes?.data.find((c) => c.id === classId)?.name === value) {
              return;
            }
            setCourseFilters("name", value);
          }}
          getOptionLabel={(option) => option.name}
          sx={{
            width: { xs: "260px", sm: "260px", md: "260px", lg: "260px" },
            marginRight: 2,
          }}
        />
      </Stack>
    </>
  );
}
