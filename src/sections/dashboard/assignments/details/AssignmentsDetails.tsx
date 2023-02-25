import { useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Stack,
  Drawer,
  Avatar,
  Tooltip,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import { IAssignmentsCard } from "../../../../@types/assignments";
import Iconify from "@components/iconify";
import Scrollbar from "@components/scrollbar";
import AssignmentsDetailsToolbar from "./AssignmentsDetailsToolbar";
import AssignmentsDetailsPrioritizes from "./AssignmentsDetailsPrioritizes";
import { AssignmentTypes } from "../../../../redux/services/enums/assignment-types.enum";
import * as React from "react";
import { useSnackbar } from "notistack";
import { useUdpateAssignmentMutation } from "../../../../redux/services/manager";
import { DateTimePicker } from "@mui/x-date-pickers";
import AssignmentInput from "../AssignmentInput";
import { IAssignment } from "src/redux/services/interfaces/assignment.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import _ from "lodash";
import { convertDuration } from "src/utils/convertDuration";
import { CustomSmallSelect } from "@components/custom-input";

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
  assignment: IAssignment & BaseResponseInterface;
  openDetails: boolean;
  onCloseDetails: VoidFunction;
  onDeleteTask: () => void;
  schoolId: string;
};

export default function AssignmentsDetails({
  task,
  openDetails,
  onCloseDetails,
  onDeleteTask,
  assignment,
  schoolId
}:
Props): React.ReactElement | null {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [updateAssignment] = useUdpateAssignmentMutation();

  const updateField = async (
    fieldName: keyof IAssignment,
    value: string | number | null
  ): Promise<void> => {
    try {
      if (assignment[fieldName] === value) return;

      await updateAssignment({
        assignmentId: assignment.id,
        schoolId,
        [fieldName]: value,
      }).unwrap();
      enqueueSnackbar(`${fieldName} updated`);
    } catch (e) {
      enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  const handleClickAttach = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <Drawer
      open={openDetails}
      onClose={onCloseDetails}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 480,
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
            defaultValue={assignment.name}
            onBlur={async (e) => { await updateField("name", e.target.value); }}
          />
          {/* Assignee */}
          <Stack direction="row">
            <StyledLabel sx={{ height: 40, lineHeight: "40px", my: 0.5 }}>
              Assignee
            </StyledLabel>

            <Stack direction="row" flexWrap="wrap" alignItems="center">
              {task.assignee_classes?.map((user) => (
                  <Avatar
                    key={user.id}
                    alt={user.name}
                    src="/"
                    sx={{ m: 0.5 }}
                  />
                ))}

              <Tooltip title="Add assignee">
                <IconButton
                  sx={{
                    p: 1,
                    ml: 0.5,
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                    border: (theme) => `dashed 1px ${theme.palette.divider}`,
                  }}
                >
                  <Iconify icon="eva:plus-fill" />
                </IconButton>
              </Tooltip>

              {/* <KanbanContactsDialog
                assignee={task.assignee}
                open={openContacts}
                onClose={handleCloseContacts}
              /> */}
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Type:</StyledLabel>
            <CustomSmallSelect
              value={assignment.type}
              onChange={async (e) => { updateField("type", e.target.value); }}
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
              prioritize={assignment.complexity}
              onChangePrioritize={async (value) => { await updateField("complexity", value); }}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel> Start Date: </StyledLabel>
            <DateTimePicker
              value={assignment.start_date}
              onChange={async (newValue) => { await updateField("start_date", newValue as string); }
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  size="small"
                  onKeyDown={(e) => { e.preventDefault(); }}
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
              value={assignment.end_date}
              onChange={async (newValue) => { await updateField("end_date", newValue); }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  margin="normal"
                  fullWidth
                  onKeyDown={(e) => { e.preventDefault(); }}
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
              onChange={async (e) => { await updateField("duration", (e.target.value) || null); }
              }
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
            <StyledLabel>Points:</StyledLabel>
            <AssignmentInput
              type="number"
              value="0"
              // onChange={handleChangePoints}
              sx={{
                "& .MuiInputBase-input": {
                  py: 1,
                  borderRadius: 1,
                  typography: "body2",
                  border: "solid 1px transparent",
                  width: "auto",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left"]),
                  "&:hover, &:focus": {
                    pl: 1,
                  },
                },
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Course:</StyledLabel>

            <CustomSmallSelect>
              <option key="empty" value="en">
                no data
              </option>
              <option key="course1" value="course1">
                Javascript Base
              </option>
              <option key="course2" value="course2">
                Javascript Advance
              </option>
            </CustomSmallSelect>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledLabel>Lesson:</StyledLabel>
            <CustomSmallSelect>
              <option key="empty" value="en">
                Lesson
              </option>
              <option key="lesson1" value="lesson1">
                Variables types
              </option>
              <option key="lesson2" value="lesson2">
                Loop
              </option>
            </CustomSmallSelect>
          </Stack>
          <Stack alignItems="start">
            <StyledLabel>Description:</StyledLabel>
            <AssignmentInput
              multiline
              rows={4}
              fullWidth
              defaultValue={assignment.description}
              onBlur={async (e) => { await updateField("description", e.target.value); }}
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
