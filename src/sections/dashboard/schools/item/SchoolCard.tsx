import ConfirmDialog from "@components/confirm-dialog";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import TextMaxLine from "@components/text-max-line";
import {
  Box,
  Button,
  Card,
  CardProps,
  Divider,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { SchoolResponce } from "src/redux/services/interfaces/school.interface";
import { useLocales } from "../../../../locales";
import SchoolDetailsDrawer from "../portal/SchoolDetailsDrawer";

interface Props extends CardProps {
  school: SchoolResponce;
  selected?: boolean;
  onSelect?: VoidFunction;
  onDelete: VoidFunction;
}

export default function SchoolCard({
  school,
  selected,
  onSelect,
  onDelete,
  sx,
  ...other
}: Props): React.ReactElement | null {
  const { translate } = useLocales();

  const [showCheckbox, setShowCheckbox] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleShowCheckbox = (): void => {
    setShowCheckbox(true);
  };

  const handleHideCheckbox = (): void => {
    setShowCheckbox(false);
  };

  const handleOpenDetails = (): void => {
    setOpenDetails(true);
  };

  const handleCloseDetails = (): void => {
    setOpenDetails(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
    event.stopPropagation();
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  return (
    <>
      <Card
        onClick={handleOpenDetails}
        onMouseEnter={handleShowCheckbox}
        onMouseLeave={handleHideCheckbox}
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

        <Box sx={{ width: 40, height: 40 }}>
          <Image
            width="30"
            height="30"
            alt="school"
            src="/assets/icons/shool/school-icon.svg"
          />
        </Box>

        <TextMaxLine variant="h6" sx={{ mt: 1, mb: 0.5 }}>
          {school.name}
        </TextMaxLine>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenDetails();
            handleClosePopover();
          }}
        >
          <>
            <Iconify icon="eva:edit-fill" />
            {translate("actions_edit")}
          </>
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
          {`${translate("actions_archive")}`}
        </MenuItem>
      </MenuPopover>

      <SchoolDetailsDrawer
        item={school}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={() => {
          handleCloseDetails();
          onDelete();
        }}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={`${translate("actions_archive")}`}
        content={`${translate(
          "organizations.schools_page.archive_dialog.content"
        )}`}
        action={
          <Button variant="contained" color="error" onClick={onDelete}>
            {`${translate("actions_archive")}`}
          </Button>
        }
      />
    </>
  );
}
