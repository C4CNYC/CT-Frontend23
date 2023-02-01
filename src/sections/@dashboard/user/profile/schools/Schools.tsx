import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Card,
  Link,
  Stack,
  Avatar,
  MenuItem,
  IconButton,
  Typography,
  InputAdornment,
} from "@mui/material";
// @types
import { IUserProfileSchool } from "../../../../../@types/user";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
// components
import Iconify from "../../../../../components/iconify";
import MenuPopover from "../../../../../components/menu-popover";
import { CustomTextField } from "../../../../../components/custom-input";
import SearchNotFound from "../../../../../components/search-not-found";
import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  school: IUserProfileSchool[];
};

const school = {
  name: "Name",
  url: "Url",
};

export default function Schools({}: Props) {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <>
      <Stack
        spacing={3}
        justifyContent="space-between"
        direction={{ xs: "column", sm: "row" }}
        sx={{ my: 5 }}
      >
        <Typography variant="h4">Schools</Typography>
        {/*<AddSchool />*/}
      </Stack>

      {isNotFound ? (
        <Typography variant="body2">not found</Typography>
      ) : (
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
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type SchoolCardProps = {
  school: IUserProfileSchool;
};

function SchoolCard({ school }: SchoolCardProps) {
  const { name, avatarUrl } = school;

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleArchive = () => {
    handleClickOpen();
    handleClosePopover();
    console.log("ARCHIVE", name);
  };

  const handleEdit = () => {
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
