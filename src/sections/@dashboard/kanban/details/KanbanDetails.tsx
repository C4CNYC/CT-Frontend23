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
  IconButton, Select, Autocomplete
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

// ----------------------------------------------------------------------

const StyledLabel = styled("span")(({ theme }) => ({
  ...theme.typography.caption,
  width: 120,
  flexShrink: 0,
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

type Props = {
  task: IKanbanCard;
  assigment: [];
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
                                        school_id
                                      }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [prioritize, setPrioritize] = useState("low");

  const [taskName, setTaskName] = useState(task.name);
  const [taskType, setTaskType] = useState(task.type);
  const [startDate, setStartDate] = useState(task.start_date);
  const [endDate, setEndDate] = useState(task.end_date);
  const [taskPoints, setTaskPoints] = useState(task.points || 0);

  const TECH_OPTIONS = ["css", "html", "js"];
  const DRILLDOWN_OPTIONS = ["theme", "files", "grid"];

  const [taskDescription, setTaskDescription] = useState(task.description);
  const [updateAssigment] = useUdpateAssigmentMutation();


  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleChangeTaskName = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
    try {
      await updateAssigment({
        assigment_id: assigment.id,
        school_id,
        name: event.target.value
      }).unwrap();
    } catch (e) {
      console.log(e);
      // enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  const handleChangeType = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskType(event.target.value);
    try {
      await updateAssigment({
        assigment_id: assigment.id,
        school_id,
        type: event.target.value
      }).unwrap();
    } catch (e) {
      console.log(e);
      // enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  const handleChangeDescription = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(event.target.value);
    try {
      await updateAssigment({
        assigment_id: assigment.id,
        school_id,
        description: event.target.value
      }).unwrap();
    } catch (e) {
      console.log(e);
      // enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };


  const handleChangeStartDate = async (newValue: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(newValue).toISOString());

    try {
      await updateAssigment({
        assigment_id: assigment.id,
        school_id,
        start_date: startDate
      }).unwrap();
    } catch (e) {
      console.log(e);
      // enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  const handleChangeEndDate = async (newValue: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(newValue).toISOString());

    try {
      await updateAssigment({
        assigment_id: assigment.id,
        school_id,
        end_date: endDate
      }).unwrap();
    } catch (e) {
      console.log(e);
      // enqueueSnackbar(e.data.message, { variant: "error" });
    }
  };

  const handleChangePoints = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskPoints(event.target.value);

    // try {
    //   await updateAssigment({
    //     assigment_id: assigment.id,
    //     school_id,
    //   }).unwrap();
    // } catch (e) {
    //   console.log(e);
    //   // enqueueSnackbar(e.data.message, { variant: "error" });
    // }
  };

  const handleChangeTaskDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskDescription(event.target.value);
  };

  const handleChangePrioritize = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrioritize((event.target as HTMLInputElement).value);
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
            md: 678
          }
        }
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
            value={taskName}
            onChange={handleChangeTaskName}
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
                    border: (theme) => `dashed 1px ${theme.palette.divider}`
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
          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel>Type:</StyledLabel>
            <Select
              native
              value={taskType}
              size="small"
              onChange={handleChangeType}
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px"
                },
                "& .MuiNativeSelect-icon": {
                  display: "none"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
            >
              {Object.keys(AssigmentTypes).map((t) => (
                <option
                  key={AssigmentTypes[t as keyof typeof AssigmentTypes]}
                  value={AssigmentTypes[t as keyof typeof AssigmentTypes]}
                >
                  {t.split("_").join(" ").toLocaleLowerCase()}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel>Points:</StyledLabel>
            <AssignmentInput
              type="number"
              value={taskPoints}
              onChange={handleChangePoints}
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
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
            />
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel>Course:</StyledLabel>
            <Select
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                  width: "220px"
                },
                "& .MuiNativeSelect-icon": {
                  display: "none"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
              native
            >
              <option key="empty" value="en">no data</option>
              <option key="course1" value="course1">
                Javascript Base
              </option>
              <option key="course2" value="course2">
                Javascript Advance
              </option>
            </Select>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important", mr: 2 }}>
            <StyledLabel>Lesson:</StyledLabel>
            <Select
              size="small"
              native
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px"
                },
                "& .MuiNativeSelect-icon": {
                  display: "none"
                },
                "& .MuiOutlinedInput": {
                  fontSize: "14px"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  typography: "caption",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
            >
              <option key="empty" value="en">Lesson</option>
              <option key="lesson1" value="lesson1">
                Variables types
              </option>
              <option key="lesson2" value="lesson2">
                Loop
              </option>
            </Select>

          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel>Complexity:</StyledLabel>

            <KanbanDetailsPrioritizes
              prioritize={prioritize}
              onChangePrioritize={handleChangePrioritize}
            />
          </Stack>
          <Stack alignItems="start" sx={{ mt: "24px !important" }}>
            <StyledLabel>Description:</StyledLabel>
            <AssignmentInput
              multiline
              rows={4}
              fullWidth
              value={taskDescription}
              onChange={handleChangeDescription}
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
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel>Time to complete</StyledLabel>
            <Select
              native
              name="time"
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px"
                },
                "& .MuiNativeSelect-icon": {
                  display: "none"
                },
                "& .MuiOutlinedInput": {
                  fontSize: "14px"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  typography: "caption",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
            >
              <option key="empty" value="en">
                no limit
              </option>
              <option key="0.25h" value="0.25h">
                0.25h
              </option>
              <option key="0.5h" value="0.5h">
                0.5h
              </option>
              <option key="1h" value="1h">
                1h
              </option>
              <option key="1.5h" value="1.5h">
                1.5h
              </option>
              <option key="2h" value="2h">
                2h
              </option>
              <option key="3h" value="3h">
                3h
              </option>
            </Select>
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel>Grade:</StyledLabel>
            <Select
              native
              name="time"
              size="small"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px"
                },
                "& .MuiNativeSelect-icon": {
                  display: "none"
                },
                "& .MuiOutlinedInput": {
                  fontSize: "14px"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  py: 1,
                  border: `solid 1px transparent`,
                  typography: "caption",
                  transition: (theme) =>
                    theme.transitions.create(["padding-left", "border-color"]),
                  "&:hover, &:focus": {
                    pl: 1,
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
              }}
            >
              <option key="empty" value="en">Grade 0</option>
              <option key="grade1" value="grade1">
                Grade 1
              </option>
              <option key="grade2" value="grade2">
                Grade 2
              </option>
            </Select>
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
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
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel> Start Date: </StyledLabel>
            <DateTimePicker
              value={startDate}
              onChange={(newValue) => {
                handleChangeStartDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                      border: "solid 1px transparent !important"
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      py: 1,
                      border: "solid 1px transparent !important",
                      typography: "caption",
                      transition: (theme) =>
                        theme.transitions.create(["padding-left", "border-color"]),
                      "&:hover, &:focus": {
                        pl: 1,
                        border: (theme) => `solid 1px ${theme.palette.text.primary}`
                      }
                    }
                  }}
                  style={{ margin: 0, width: "auto" }}
                />
              )}
            />
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mt: "10px !important" }}>
            <StyledLabel> End Date: </StyledLabel>
            <DateTimePicker
              value={endDate}
              onChange={(newValue) => {
                handleChangeEndDate(newValue);
              }}
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
                        theme.transitions.create(["padding-left", "border-color"]),
                      "&:hover, &:focus": {
                        pl: 1,
                        border: (theme) => `solid 1px ${theme.palette.text.primary}`
                      }
                    }
                  }}
                  style={{ margin: 0, border: "none !important", width: "auto" }}
                />
              )}
            />
          </Stack>


          <Stack sx={{ mt: "15px !important" }}>
            <StyledLabel>Class notes:</StyledLabel>
            <AssignmentInput
              multiline
              fullWidth
              rows={3}
              value={taskDescription}
              onChange={handleChangeDescription}
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
                    border: (theme) => `solid 1px ${theme.palette.text.primary}`
                  }
                }
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
