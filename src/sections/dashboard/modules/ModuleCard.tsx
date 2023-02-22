import { useState } from "react";
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  MenuItem,
  IconButton
} from "@mui/material";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import TextMaxLine from "@components/text-max-line";
import { useSnackbar } from "@components/snackbar";
import ConfirmDialog from "@components/confirm-dialog";
import CreateModuleDialog from "@sections/dashboard/modules/CreateModuleDialog";
import { IModule } from "../../../redux/services/interfaces/class.interface";
import { useDeleteAssignmentMutation, useDeleteModuleMutation } from "../../../redux/services/manager";
import { PATH_DASHBOARD } from "@routes/paths";

// ----------------------------------------------------------------------

interface Props extends IModule {
  // folder: IFolderManager;
  selected?: boolean;
  onSelect?: VoidFunction;
  key: number;
  module: {
    name: string;
    description: string;
    id: string;
    active: boolean;
  };
}

export default function ModuleCard({
                                     module
                                   }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [deleteModule] = useDeleteModuleMutation();


  const onDelete = async () => {
    try {
      await deleteModule({ id: module.id }).unwrap();
      enqueueSnackbar("Module deleted!");
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error"
      });
    }
  };

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
        href={`${PATH_DASHBOARD.lessons.root}?id=${module.id}`}
        sx={{
          textDecoration: "none",
          p: 2.5,
          width: 1,
          boxShadow: 0,
          bgcolor: "background.default",
          maxWidth: "auto",
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          "&:hover": {
            bgcolor: "grey.100"
          }
        }}
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
          {module.name}
        </TextMaxLine>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ typography: "caption", color: "text.disabled" }}
        >
          <Box>{module.description}</Box>
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
          id={module.id}
          defaultValues={{ name: module.name, description: module.description, active: module.active }}
        >
          <MenuItem onClick={() => {
            handleClosePopover();
          }}>
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
