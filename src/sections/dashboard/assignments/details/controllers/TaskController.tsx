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
import { ITask } from "src/redux/services/interfaces/task.interface";
import { useUpdateTaskAssignmentMutation } from "src/redux/services/manager/assignments-manager";
import { useGetTasksQuery } from "src/redux/services/manager/tasks-manager";
import { RootState } from "src/redux/store";

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

  const [updateTask] = useUpdateTaskAssignmentMutation();
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
          // eslint-disable-next-line no-useless-return
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
