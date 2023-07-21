import { useState } from "react";

// @mui
import { Button, ClickAwayListener, Paper, TextField } from "@mui/material";

// import { createColumn } from "../../../../redux/slices/kanban";
// components
import { Iconify } from "@components";

// ----------------------------------------------------------------------

export default function AssignmentsColumnAdd(): React.ReactElement {
  const [name, setName] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };

  const handleCreateColumn = (): void => {
    try {
      if (name) {
        // dispatch(createColumn({ name }));
        setName("");
      }
      handleClose();
    } catch (e: any) {}
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleCreateColumn();
    }
  };

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {open ? (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <TextField
            autoFocus
            fullWidth
            placeholder="New section"
            value={name}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            InputProps={{
              sx: { typography: "h6" },
            }}
          />
        </ClickAwayListener>
      ) : (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          Add section
        </Button>
      )}
    </Paper>
  );
}
