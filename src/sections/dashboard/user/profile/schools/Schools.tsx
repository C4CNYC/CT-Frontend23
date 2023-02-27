import { useState } from "react";
// @mui
import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogActions,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
// @types
import Button from "@mui/material/Button";
// components
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { IUserProfileSchool } from "src/@types/courses";

interface Props {
  school: IUserProfileSchool;
}

export default function Schools({ school }: Props): React.ReactElement | null {
  return (
    <>
      <Stack
        spacing={3}
        justifyContent="space-between"
        direction={{ xs: "column", sm: "row" }}
        sx={{ my: 5 }}
      >
        <Typography variant="h4">Schools</Typography>
        {/* <AddSchool /> */}
      </Stack>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        <SchoolCard school={school} />
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

interface SchoolCardProps {
  school: IUserProfileSchool;
}

function SchoolCard({ school }: SchoolCardProps): React.ReactElement | null {
  const { name, avatarUrl } = school;

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpenDialog(true);
  };

  const handleClose = (): void => {
    setOpenDialog(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleArchive = (): void => {
    handleClickOpen();
    handleClosePopover();
    console.log("ARCHIVE", name);
  };

  const handleEdit = (): void => {
    handleClosePopover();
    console.log("EDIT", name);
  };

  return (
    <>
      <Card
        sx={{
          py: 5,
          display: "flex",
          position: "relative",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{ width: 64, height: 64, mb: 3 }}
        />

        <Link variant="subtitle1" color="text.primary">
          {name}
        </Link>

        <IconButton
          color={openPopover ? "inherit" : "default"}
          onClick={handleOpenPopover}
          sx={{ top: 8, right: 8, position: "absolute" }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
      >
        <MenuItem onClick={handleArchive} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" />
          Archive
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Archive School</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to archive this school? This will disable all
            all classes. Learners will still be able to login.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
