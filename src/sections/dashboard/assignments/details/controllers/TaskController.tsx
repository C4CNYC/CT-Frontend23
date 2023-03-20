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
import { ITask } from "src/redux/services/interfaces/task.interface";
import { useUdpateTaskAssignmentMutation } from "src/redux/services/manager/assignments-manager";
import { useGetTasksQuery } from "src/redux/services/manager/tasks-manager";
import { RootState } from "src/redux/store";

import { BaseResponseInterface } from "src/utils/baseResponce.interface";

type TaskType = ITask & BaseResponseInterface;

interface Props {
  assignmentId: string;
  lesson: TaskType;
}

export default function TaskController({
  assignmentId,
  lesson,
}: Props): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const schoolId = useSelector((state: RootState) => state.manager.schoolId);
  const { filters, setFilter } = useFilters({ name: "", take: 50 });

  const [updateTask] = useUdpateTaskAssignmentMutation();
  const { data: tasks } = useGetTasksQuery({ ...filters });

  if (!tasks?.data) {
    return <CircularProgress />;
  }

  const onChange = async (
    _event: React.SyntheticEvent<any>,
    _newValue: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<TaskType>
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
    <Autocomplete<TaskType>
      options={tasks?.data}
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
