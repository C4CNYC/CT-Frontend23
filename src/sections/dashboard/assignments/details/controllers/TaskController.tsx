import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useSelector } from "react-redux";
import { useFilters } from "src/hooks/useFilters";
import { ILesson } from "src/redux/services/interfaces/courseUnits.interface";
import { useUdpateTaskAssignmentMutation } from "src/redux/services/manager/assignments-manager";
import { useGetLessonsQuery } from "src/redux/services/manager/lessons-manager";
import { RootState } from "src/redux/store";

import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type LessonType = ILesson & BaseResponseInterface;

interface Props {
  assignmentId: string;
  lesson: LessonType
}

export default function LessonController({ assignmentId, lesson }: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [updateTask] = useUdpateTaskAssignmentMutation();
  const { data: lessons } = useGetLessonsQuery(
    { ...filters },
  );

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
        task_id: details?.option.id as string,
      };
      switch (reason) {
        case "selectOption": {
          await updateTask(payload).unwrap();
          enqueueSnackbar(`${details?.option.name ?? ""} added to assigment`);
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
          onInputChange={(e, value) => { setFilter("name", value) }}
          defaultValue={lesson}
          onChange={onChange}
          getOptionLabel={(option) => option.name}
          sx={{ width: 200, marginRight: 2 }}
        />
  );
}
