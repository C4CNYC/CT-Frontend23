import ConfirmDialog from "@components/confirm-dialog";
import Iconify from "@components/iconify";
import MenuPopover from "@components/menu-popover";
import { useSnackbar } from "@components/snackbar";
import TextMaxLine from "@components/text-max-line";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import { PATH_DASHBOARD } from "@routes/paths";
import CreateModuleDialog from "@sections/dashboard/modules/CreateModuleDialog";
import Link from "next/link";
import { useState } from "react";
import { BaseResponseInterface } from "src/utils/baseResponce.interface";
import { IModule } from "../../../redux/services/interfaces/class.interface";
import { useDeleteModuleMutation } from "../../../redux/services/manager/modules-manager";

// ----------------------------------------------------------------------

interface Props extends IModule {
  selected?: boolean;
  onSelect?: VoidFunction;
  key: number;
  module: IModule & BaseResponseInterface;
}

export default function ModuleCard({
  module,
}: Props): React.ReactElement | null {
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [deleteModule] = useDeleteModuleMutation();

  const onDelete = async (): Promise<void> => {
    try {
      await deleteModule({ id: module.id }).unwrap();
      enqueueSnackbar("Module deleted!");
    } catch (e) {
      enqueueSnackbar(e.data.message, {
        variant: "error",
      });
    }
  };

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    setOpenPopover(event.currentTarget);
    event.stopPropagation();
    event.preventDefault();
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  return (
    <>
      <Card
        component={Link}
        href={`${PATH_DASHBOARD.lessons.root}?module_id=${module.id}`}
        sx={{
          textDecoration: "none",
          p: 2.5,
          width: 1,
          boxShadow: 0,
          bgcolor: "background.default",
          maxWidth: "auto",
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          "&:hover": {
            bgcolor: "grey.100",
          },
        }}
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
          <Box
            sx={{
              width: 2,
              height: 2,
              borderRadius: "50%",
              bgcolor: "currentColor",
            }}
          />
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
          defaultValues={{
            name: module.name,
            description: module.description as string,
            active: module.active as boolean,
          }}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </CreateModuleDialog>

        <MenuItem
          component={Link}
          href={PATH_DASHBOARD.modules.setting(module.id)}
        >
          <Iconify icon="ant-design:setting-outlined" />
          Settings
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
