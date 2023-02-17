import { useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Stack,
  Drawer,
  Avatar,
  Tooltip,
  Divider,
  TextField,
  Box,
  IconButton,
  Select,
  Autocomplete,
} from "@mui/material";
import { IKanbanCard } from "../../../../@types/kanban";
import Iconify from "../../../../components/iconify";
import Scrollbar from "../../../../components/scrollbar";
import KanbanDetailsToolbar from "./KanbanDetailsToolbar";
import KanbanDetailsPrioritizes from "./KanbanDetailsPrioritizes";
import { AssigmentTypes } from "../../../../redux/services/enums/assigment-types.enum";
import * as React from "react";
import { useSnackbar } from "notistack";
import { useUdpateAssigmentMutation } from "../../../../redux/services/manager";
import { DateTimePicker } from "@mui/x-date-pickers";
import AssignmentInput from "../KanbanInputName";
import { IAssigment } from "src/redux/services/interfaces/assigment.interface";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import _ from "lodash";
import { convertDuration } from "src/utils/convertDuration";

// ----------------------------------------------------------------------

const StyledLabel = styled("span")(({ theme }) => ({
  ...theme.typography.caption,
  width: 120,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

type Props = {
  task: IKanbanCard;
  assigment: IAssigment & BaseResponseInterface;
  openDetails: boolean;
  onCloseDetails: VoidFunction;
  onDeleteTask: () => void;
  school_id: string;
};

type FormValuesProps = {
  type: string;
  course: string;
  lesson: string;
  description: string;
  name: string;
  tags: string;
  class: string;
  end_date: string;
  start_date: string;
  notes: string;
  graded: boolean;
  points: string;
};

export default function KanbanDetails({
  task,
  openDetails,
  onCloseDetails,
  onDeleteTask,
  assigment,
  school_id,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [updateAssigment] = useUdpateAssigmentMutation();

  const updateField = async (
    fieldName: keyof IAssigment,
    value: string | number | null
  ) => {
    try {
      await updateAssigment({
        assigment_id: assigment.id,
        school_id,
        [fieldName]: value,
      }).unwrap();
      enqueueSnackbar(`${fieldName} updated`);
    } catch (e) {
      enqueueSnackbar(e.data.message, { variant: "error" }); 
    }
  };

  const handleClickAttach = () => {
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
      <KanbanDetailsToolbar
        taskName={task.name}
        fileInputRef={fileInputRef}
        onAttach={handleClickAttach}
        onDelete={onDeleteTask}
        // onCompleted={handleCompleted}
        onCloseDetails={onCloseDetails}
        task_id={task.id}
      />

      <Divider />

      <Scrollbar>
        <Stack spacing={3} sx={{ px: 2.5, pt: 3, pb: 3 }}>
          <AssignmentInput
            placeholder="Task name"
            defaultValue={assigment.name}
            onBlur={(e) => updateField("name", e.target.value)}
          />
          {/* Assignee */}
          <Stack direction="row">
            <StyledLabel sx={{ height: 40, lineHeight: "40px", my: 0.5 }}>
              Assignee
            </StyledLabel>

            <Stack direction="row" flexWrap="wrap" alignItems="center">
              {task.assignee_classes &&
                task.assignee_classes.map((user) => (
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
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "20px !important" }}
          >
            <StyledLabel>Type:</StyledLabel>
            <Select
              native
              defaultValue={assigment.type}
              size="small"
              onChange={(e) => updateField("type", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
                "& .MuiNativeSelect-icon": {
                  display: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: `solid 1px transparent`,
                  },
                },
              }}
            >
              {Object.keys(AssigmentTypes).map((t) => (
                <option
                  key={AssigmentTypes[t as keyof typeof AssigmentTypes]}
                  value={AssigmentTypes[t as keyof typeof AssigmentTypes]}
                >
                  {_.upperCase(t.split("_").join(" ").toLocaleLowerCase())}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "10px !important" }}
          >
            <StyledLabel>Complexity:</StyledLabel>

            <KanbanDetailsPrioritizes
              prioritize={assigment.complexity}
              onChangePrioritize={(value) => updateField("complexity", value)}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "10px !important" }}
          >
            <StyledLabel> Start Date: </StyledLabel>
            <DateTimePicker
              value={assigment.start_date}
              onChange={(newValue) =>
                updateField("start_date", newValue as string)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                      border: "solid 1px transparent !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      py: 1,
                      border: "solid 1px transparent !important",
                      typography: "caption",
                      transition: (theme) =>
                        theme.transitions.create([
                          "padding-left",
                          "border-color",
                        ]),
                      "&:hover, &:focus": {
                        pl: 1,
                        border: (theme) =>
                          `solid 1px ${theme.palette.text.primary}`,
                      },
                    },
                  }}
                  style={{ margin: 0, width: "auto" }}
                />
              )}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "10px !important" }}
          >
            <StyledLabel> End Date: </StyledLabel>
            <DateTimePicker
              value={assigment.end_date}
              onChange={(newValue) => updateField("end_date", newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  margin="normal"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                      border: "solid 1px transparent !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      py: 1,
                      border: "solid 1px transparent !important",
                      typography: "caption",
                      transition: (theme) =>
                        theme.transitions.create([
                          "padding-left",
                          "border-color",
                        ]),
                      "&:hover, &:focus": {
                        pl: 1,
                        border: (theme) =>
                          `solid 1px ${theme.palette.text.primary}`,
                      },
                    },
                  }}
                  style={{
                    margin: 0,
                    border: "none !important",
                    width: "auto",
                  }}
                />
              )}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "10px !important" }}
          >
            <StyledLabel>Duration:</StyledLabel>
            <Select
              native
              defaultValue={
                assigment.duration ? convertDuration(assigment.duration) : null
              }
              onChange={(e) =>
                updateField("duration", (e.target.value as string) || null)
              }
              name="duration"
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
                "& .MuiNativeSelect-icon": {
                  display: "none",
                },
                "& .MuiOutlinedInput": {
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  typography: "caption",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) =>
                      `solid 1px ${theme.palette.text.primary}`,
                  },
                },
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
              <option key="1.5h" value="1 H 30 M">
                2 h 30 m
              </option>
              <option key="3h" value="3 H">
                3 h
              </option>
            </Select>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "10px !important" }}
          >
            <StyledLabel>Grade:</StyledLabel>
            <Select
              native
              name="time"
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
                "& .MuiNativeSelect-icon": {
                  display: "none",
                },
                "& .MuiOutlinedInput": {
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  typography: "caption",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) =>
                      `solid 1px ${theme.palette.text.primary}`,
                  },
                },
              }}
            >
              <option key="empty" value="en">
                Grade 0
              </option>
              <option key="grade1" value="grade1">
                Grade 1
              </option>
              <option key="grade2" value="grade2">
                Grade 2
              </option>
            </Select>
          </Stack>

          {/* <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel>Technologies:</StyledLabel>
            <Autocomplete
              sx={{
                "& .MuiSvgIcon-root": {
                  display: "none",
                  border: "solid 1px transparent !important",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 1px transparent",
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
              size="small"
              multiple
              fullWidth
              options={TECH_OPTIONS}
              getOptionLabel={(option) => option}
              defaultValue={[TECH_OPTIONS[1]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ marginRight: "10px", border: "none !important", width: "auto" }}

                />
              )}
            />
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel>Drilldown tags:</StyledLabel>
            <Autocomplete
              sx={{
                "& .MuiSvgIcon-root": {
                  display: "none",
                  border: "solid 1px transparent !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 1px transparent",
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
              size="small"
              multiple
              fullWidth
              options={DRILLDOWN_OPTIONS}
              getOptionLabel={(option) => option}
              defaultValue={[DRILLDOWN_OPTIONS[1]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ marginRight: "10px", border: "none !important", width: "auto" }}
                />
              )}
            />
          </Stack> */}
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "10px !important" }}
          >
            <StyledLabel>Points:</StyledLabel>
            <AssignmentInput
              type="number"
              // value={taskPoints}
              // onChange={handleChangePoints}
              sx={{
                "& .MuiInputBase-input": {
                  py: 1,
                  pl: "12px",
                  borderRadius: 1,
                  typography: "body2",
                  border: `solid 1px transparent`,
                  width: "auto",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    border: (theme) =>
                      `solid 1px ${theme.palette.text.primary}`,
                  },
                },
              }}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "10px !important" }}
          >
            <StyledLabel>Course:</StyledLabel>
            <Select
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                  width: "220px",
                },
                "& .MuiNativeSelect-icon": {
                  display: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) =>
                      `solid 1px ${theme.palette.text.primary}`,
                  },
                },
              }}
              native
            >
              <option key="empty" value="en">
                no data
              </option>
              <option key="course1" value="course1">
                Javascript Base
              </option>
              <option key="course2" value="course2">
                Javascript Advance
              </option>
            </Select>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: "10px !important", mr: 2 }}
          >
            <StyledLabel>Lesson:</StyledLabel>
            <Select
              size="small"
              native
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
                "& .MuiNativeSelect-icon": {
                  display: "none",
                },
                "& .MuiOutlinedInput": {
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  typography: "caption",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) =>
                      `solid 1px ${theme.palette.text.primary}`,
                  },
                },
              }}
            >
              <option key="empty" value="en">
                Lesson
              </option>
              <option key="lesson1" value="lesson1">
                Variables types
              </option>
              <option key="lesson2" value="lesson2">
                Loop
              </option>
            </Select>
          </Stack>
          <Stack alignItems="start" sx={{ mt: "24px !important" }}>
            <StyledLabel>Description:</StyledLabel>
            <AssignmentInput
              multiline
              rows={4}
              fullWidth
              defaultValue={assigment.description}
              onBlur={(e) => updateField("description", e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  py: 1,
                  borderRadius: 1,
                  typography: "body2",
                  border: `solid 1px transparent`,
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) =>
                      `solid 1px ${theme.palette.text.primary}`,
                  },
                },
              }}
            />
          </Stack>

          {/*Attachments*/}
          {/*<Stack direction="row">*/}
          {/*<StyledLabel sx={{ py: 0.5 }}>Attachments</StyledLabel>*/}
          {/* <KanbanDetailsAttachments attachments={task.attachments} /> */}
          {/*</Stack>*/}
        </Stack>

        {/* {!!task.comments.length && <KanbanDetailsCommentList comments={task.comments} />} */}
      </Scrollbar>

      {/*<Divider />*/}

      {/*<KanbanDetailsCommentInput />*/}
    </Drawer>
  );
}
