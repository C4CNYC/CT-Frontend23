import { CustomSmallSelect, Scrollbar } from "@ct-nx/components";
import { Divider, Drawer, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DateTimePicker } from "@mui/x-date-pickers";
import _ from "lodash";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useRef } from "react";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";
import { convertDuration } from "@ct-nx/utils";
import { IAssignmentsCard } from "../../../../@types/assignments";
import { AssignmentTypes } from "../../../../redux/services/enums/assignment-types.enum";
import {
  useGetAssignmentQuery,
  useUdpateAssignmentMutation,
} from "../../../../redux/services/manager/assignments-manager";
import AssignmentInput from "../AssignmentInput";
import AssignmentsDetailsPrioritizes from "./AssignmentsDetailsPrioritizes";
import AssignmentsDetailsToolbar from "./AssignmentsDetailsToolbar";
import ClassesCountroller from "./controllers/ClassesController";
import LessonController from "./controllers/LessonController";
import TaskController from "./controllers/TaskController";

// ----------------------------------------------------------------------

const StyledLabel = styled("span")(({ theme }) => ({
  ...theme.typography.caption,
  width: 120,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

interface Props {
  task: IAssignmentsCard;
  assignmentId: string;
  openDetails: boolean;
  onCloseDetails: VoidFunction;
  onDeleteTask: () => void;
  schoolId: string;
}

export default function AssignmentsDetails({
  task,
  openDetails,
  onCloseDetails,
  onDeleteTask,
  assignmentId,
  schoolId,
}: Props): React.ReactElement | null {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [updateAssignment] = useUdpateAssignmentMutation();
  const { data: assignment } = useGetAssignmentQuery(
    {
      schoolId,
      assignmentId,
    },
    { skip: !assignmentId || !openDetails }
  );

  const updateField = async (
    fieldName: keyof IAssignment,
    value: string | number | null
  ): Promise<void> => {
    try {
      if (!assignment || assignment[fieldName] === value) return;

      await updateAssignment({
        assignmentId: assignment.id,
        schoolId,
        [fieldName]: value,
      }).unwrap();
      enqueueSnackbar(`${fieldName} updated`);
    } catch (e: any) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  const handleClickAttach = (): void => {
    fileInputRef.current?.click();
  };

  if (!assignment) return null;

  return (
    <Drawer
      open={openDetails}
      onClose={onCloseDetails}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 580,
          },
        },
      }}
    >
      <AssignmentsDetailsToolbar
        taskName={task.name}
        fileInputRef={fileInputRef}
        onAttach={handleClickAttach}
        onDelete={onDeleteTask}
        onCloseDetails={onCloseDetails}
      />

      <Divider />

      <Scrollbar>
        <Stack spacing={3} sx={{ px: 2.5, pt: 3, pb: 3 }}>
          <AssignmentInput
            placeholder="Task name"
            defaultValue={assignment?.name}
            onBlur={async (e: any) => {
              await updateField("name", e.target.value);
            }}
          />
          <Stack direction="row" alignItems="center">
            <StyledLabel>Type:</StyledLabel>
            <CustomSmallSelect
              value={assignment?.type}
              onChange={async (e: any) => {
                updateField("type", e.target.value);
              }}
            >
              {Object.keys(AssignmentTypes).map((t) => (
                <option
                  key={AssignmentTypes[t as keyof typeof AssignmentTypes]}
                  value={AssignmentTypes[t as keyof typeof AssignmentTypes]}
                >
                  {_.upperCase(t.split("_").join(" ").toLocaleLowerCase())}
                </option>
              ))}
            </CustomSmallSelect>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Complexity:</StyledLabel>

            <AssignmentsDetailsPrioritizes
              prioritize={assignment?.complexity as string}
              onChangePrioritize={async (value) => {
                await updateField("complexity", value);
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel> Start Date: </StyledLabel>
            <DateTimePicker
              value={assignment?.start_date}
              onChange={async (newValue) => {
                await updateField("start_date", newValue as string);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  size="small"
                  onKeyDown={(e: any) => {
                    e.preventDefault();
                  }}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "solid 1px transparent !important",
                    },
                  }}
                  style={{ margin: 0, width: "200px" }}
                />
              )}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel> End Date: </StyledLabel>
            <DateTimePicker
              value={assignment?.end_date}
              onChange={async (newValue) => {
                await updateField("end_date", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  margin="normal"
                  fullWidth
                  onKeyDown={(e: any) => {
                    e.preventDefault();
                  }}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "solid 1px transparent !important",
                    },
                  }}
                  style={{ margin: 0, width: "200px" }}
                />
              )}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Duration:</StyledLabel>
            <CustomSmallSelect
              value={
                assignment.duration
                  ? convertDuration(assignment.duration)
                  : null
              }
              onChange={async (e: any) => {
                await updateField("duration", e.target.value || null);
              }}
            >
              <option key="empty" value="">
                No Limit
              </option>
              <option key="0.25h" value="15 M">
                15 m
              </option>
              <option key="0.5h" value="30 M">
                30 m
              </option>
              <option key="1h" value="1 H">
                1 h
              </option>
              <option key="1.5h" value="1 H 30 M">
                1 h 30 m
              </option>
              <option key="2h" value="2 H">
                2 h
              </option>
              <option key="2.5h" value="2 H 30 M">
                2 h 30 m
              </option>
              <option key="3h" value="3 H">
                3 h
              </option>
            </CustomSmallSelect>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Grade:</StyledLabel>
            <CustomSmallSelect value="">
              <option key="empty" value="en">
                Grade 0
              </option>
              <option key="grade1" value="grade1">
                Grade 1
              </option>
              <option key="grade2" value="grade2">
                Grade 2
              </option>
            </CustomSmallSelect>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Task:</StyledLabel>
            <TaskController
              assignmentId={assignmentId}
              lesson={assignment.code_assignment}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Lesson:</StyledLabel>
            <LessonController
              assignmentId={assignmentId}
              lesson={assignment.lesson}
            />
          </Stack>
          <Stack direction="row">
            <StyledLabel sx={{ height: 40, lineHeight: "40px", my: 0.5 }}>
              Classes:
            </StyledLabel>

            <Stack direction="row" flexWrap="wrap" alignItems="center">
              <ClassesCountroller
                assignmentId={assignmentId}
                addedClasses={assignment.assignee_classes}
              />
            </Stack>
          </Stack>
          <Stack alignItems="start">
            <StyledLabel>Description:</StyledLabel>
            <AssignmentInput
              multiline
              rows={4}
              fullWidth
              defaultValue={assignment.description}
              onBlur={async (e: any) => {
                await updateField("description", e.target.value);
              }}
              sx={{
                "& .MuiInputBase-input": {
                  py: 1,
                  borderRadius: 1,
                  typography: "body2",
                  border: "solid 1px transparent",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left"]),
                  "&:hover, &:focus": {
                    pl: 1,
                  },
                },
              }}
            />
          </Stack>

          {/* Attachments */}
          {/* <Stack direction="row"> */}
          {/* <StyledLabel sx={{ py: 0.5 }}>Attachments</StyledLabel> */}
          {/* <KanbanDetailsAttachments attachments={task.attachments} /> */}
          {/* </Stack> */}
        </Stack>

        {/* {!!task.comments.length && <KanbanDetailsCommentList comments={task.comments} />} */}
      </Scrollbar>

      {/* <Divider /> */}

      {/* <KanbanDetailsCommentInput /> */}
    </Drawer>
  );
}
