import { useState } from "react";
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  MenuItem,
  Checkbox,
  CardProps,
  IconButton
} from "@mui/material";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import { fData } from "../../../utils/formatNumber";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import TextMaxLine from "@components/text-max-line";
import { useSnackbar } from "@components/snackbar";
import ConfirmDialog from "@components/confirm-dialog";
import CreateModuleDialog from "@sections/dashboard/modules/CreateModuleDialog";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  // folder: IFolderManager;
  selected?: boolean;
  onSelect?: VoidFunction;
  onDelete: VoidFunction;
}

export default function ModuleCard({
                                     folder,
                                     selected,
                                     onSelect,
                                     onDelete,
                                     sx,
                                     ...other
                                   }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);


  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <Card
        component="a"
        href="#"
        sx={{
          textDecoration: "none",
          p: 2.5,
          width: 1,
          maxWidth: 222,
          boxShadow: 0,
          bgcolor: "background.default",
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          "&:hover": {
            bgcolor: "grey.100"
          },
          ...sx
        }}
        {...other}
      >
        <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: "absolute" }}>
          <IconButton color={openPopover ? "inherit" : "default"} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
        <Box
          component="img"
          src="/assets/icons/files/ic_folder.svg"
          sx={{ width: 40, height: 40 }}
        />

        <TextMaxLine variant="h6" sx={{ mt: 1, mb: 0.5 }}>
          Name
        </TextMaxLine>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ typography: "caption", color: "text.disabled" }}
        >
          <Box> Description </Box>

          <Box sx={{ width: 2, height: 2, borderRadius: "50%", bgcolor: "currentColor" }} />

        </Stack>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <CreateModuleDialog
          isEdit
          defaultValues={{ name: "name", description: "qwe", active: true }}
          updateModule={() => {
            handleClosePopover();
          }}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </CreateModuleDialog>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
