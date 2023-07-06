import { useState } from "react";
// @mui
import {
  Button,
  Card,
  CardProps,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
// hooks
import { TextMaxLine, MenuPopover, Iconify, ConfirmDialog } from "@components";
//
// import SchoolDetailsDrawer from "../portal/SchoolDetailsDrawer";
import Image from "next/image";
import { IUserProfileSchool } from "@types";
// ----------------------------------------------------------------------

interface Props extends CardProps {
  school: IUserProfileSchool;
  selected?: boolean;
  onSelect?: VoidFunction;
  onDelete: VoidFunction;
}

export default function ContactsCard({
  selected,
  onSelect,
  onDelete,
  sx,
  ...other
}: Props): React.ReactElement | null {
  const [showCheckbox] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const contact = {
    name: "name",
    phone: "+1 000 000 000",
    email: "test@codetribe.com",
  };

  return (
    <>
      <Card
        sx={{
          p: 2.5,
          width: 1,
          maxWidth: 222,
          boxShadow: 0,
          bgcolor: "background.default",
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          ...((showCheckbox || selected) && {
            borderColor: "transparent",
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        {...other}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ top: 8, right: 8, position: "absolute" }}
        >
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>

        <Image
          alt="contact"
          src="/assets/icons/shool/users-user-svgrepo-com.svg"
          width="30"
          height="30"
        />

        <TextMaxLine variant="h6" sx={{ mt: 3, mb: 1 }}>
          {/* {folder.name} */}
        </TextMaxLine>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          <strong>Phone:</strong> {`${contact.phone}`}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          <strong>Email:</strong> {`${contact.email}`}
        </Typography>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            // handleOpenEdit();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Archive
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to archive?"
        action={
          <Button variant="contained" color="error" onClick={onDelete}>
            Archive
          </Button>
        }
      />
    </>
  );
}
