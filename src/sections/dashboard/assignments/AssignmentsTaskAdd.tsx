import DateRangePicker, {
  useDateRangePicker,
} from "@components/date-range-picker";
import Iconify from "@components/iconify";
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { IAssignmentsCard } from "../../../@types/assignments";

interface Props {
  onAddTask: (task: IAssignmentsCard) => void;
  onCloseAddTask: VoidFunction;
}

export default function AssignmentsTaskAdd({
  onAddTask,
  onCloseAddTask,
}: Props): React.ReactElement | null {
  const [name, setName] = useState("");

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(new Date(), new Date());

  return (
    <ClickAwayListener onClickAway={() => {}}>
      <div>
        <Paper variant="outlined">
          <InputBase
            multiline
            fullWidth
            placeholder="Task name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            onKeyUp={() => {}}
            sx={{ px: 2, pt: 2 }}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ pl: 1, pr: 1.5, pb: 2 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Tooltip title="Assign" onClick={() => {}}>
                <IconButton size="small">
                  <Iconify icon="eva:people-fill" />
                </IconButton>
              </Tooltip>

              {isSelectedValuePicker ? (
                <Box
                  onClick={onOpenPicker}
                  sx={{
                    cursor: "pointer",
                    typography: "caption",
                    "&:hover": { opacity: 0.72 },
                  }}
                >
                  {shortLabel}
                </Box>
              ) : (
                <Tooltip title="Due date">
                  <IconButton size="small" onClick={onOpenPicker}>
                    <Iconify icon="eva:calendar-fill" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Paper>
        <DateRangePicker
          variant="calendar"
          title="Choose due date"
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={onChangeStartDate}
          onChangeEndDate={onChangeEndDate}
          open={openPicker}
          onClose={onClosePicker}
          isSelected={isSelectedValuePicker}
          isError={isError}
        />
      </div>
    </ClickAwayListener>
  );
}
