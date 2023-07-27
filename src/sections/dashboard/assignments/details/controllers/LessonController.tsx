import * as React from "react";

import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useFilters } from "@hooks";
import { BaseResponseInterface } from "@utils";
import { ILesson } from "src/redux/services/interfaces/courseUnits.interface";
import { useUpdateLessonAssignmentMutation } from "src/redux/services/manager/assignments-manager";
import { useGetLessonsQuery } from "src/redux/services/manager/lessons-manager";
import { RootState } from "src/redux/store";

type LessonType = ILesson & BaseResponseInterface;

interface Props {
  assignmentId: string;
  lesson: LessonType;
}

export default function LessonController({
  assignmentId,
  lesson,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [updateLesson] = useUpdateLessonAssignmentMutation();
  const { data: lessons } = useGetLessonsQuery({ ...filters });

  if (!lessons?.data) {
    return <CircularProgress />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<LessonType>
  ): Promise<void> => {
    try {
      const payload = {
        assignmentId,
        schoolId,
        lesson_id: details?.option.id as string,
      };
      switch (reason) {
        case "selectOption": {
          await updateLesson(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} added to assigment`);
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    } catch {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  return (
    <Autocomplete<LessonType>
      options={lessons?.data}
      size="small"
      renderInput={(params) => <TextField {...params} />}
      onInputChange={(e, value) => {
        setFilter("name", value);
      }}
      defaultValue={lesson}
      onChange={onChange}
      getOptionLabel={(option) => option.name}
      sx={{ width: "100%" }}
    />
  );
}
