import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { format, formatDistanceToNow } from "date-fns";
import { useSnackbar } from "notistack";
import { RiExternalLinkLine } from "react-icons/ri";

import { LoadingButton } from "@mui/lab";
import {
  Divider,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

import { ConfirmDialog, MenuPopover } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Iconify } from "src/components/iconify";
import { IAssignmentReduced } from "src/redux/interfaces/assignment.interface";
import { Role } from "src/redux/services/enums/role.enum";
import { useDeleteAssignmentMutation } from "src/redux/services/manager/assignments-manager";
import {
  usePinAssignmentMutation, // useUnpinAssignmentMutation,
} from "src/redux/services/manager/assignments-student";

interface IQuestItemProps {
  assignment: IAssignmentReduced;
  schoolId: string;
}

export default function QuestItem({
  assignment,
  schoolId,
}: IQuestItemProps): React.ReactElement {
  const { query } = useRouter();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [pinAssignment] = usePinAssignmentMutation();
  // const [unpinAssignment, { isLoading: isLoadingUnpin }] =
  //   useUnpinAssignmentMutation();
  const [deleteAssignmet, { isLoading: isDeleting }] =
    useDeleteAssignmentMutation();

  const pinTomblerAssignment = async () => {
    try {
      await pinAssignment({ assignmentId: assignment.id }).unwrap();
      // await unpinAssignment({assignmentId: assignment.id}).unwrap();
      enqueueSnackbar("assignment pined");
    } catch (e) {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
  };

  const onDelete = async () => {
    try {
      await deleteAssignmet({
        schoolId,
        assignmentId: assignment.id,
      }).unwrap();
      enqueueSnackbar("assignment deleted");
    } catch (e) {
      enqueueSnackbar("something went wrong", { variant: "error" });
    }
    handleCloseConfirm();
  };

  const editAssignmentPath = STUDENT_PATH_DASHBOARD.class.addQuest(
    query.id as string,
    { schoolId, assignmentId: assignment.id }
  );
  const assignmentPath = STUDENT_PATH_DASHBOARD.quest.id(assignment.id, {
    schoolId,
  });

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = (): void => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = (): void => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Link
        component={NextLink}
        href={assignmentPath}
        underline="none"
        color={isLight ? "initial" : "#E6F5FD"}
      >
        <Stack
          sx={{
            backgroundColor: isLight
              ? "#E6F5FD"
              : theme.palette.background.paper,
            borderRadius: "10px",
            py: 1,
            px: 2,
            flexDirection: { md: "row" },
          }}
        >
          <Stack sx={{ width: "100%", gap: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack gap={2} sx={{ flexDirection: { sm: "row" } }}>
                {/* (
                  <Typography
                    sx={{ color: "#0198ED", display: "inline-flex" }}
                    variant="subtitle2"
                  >
                    Live Now
                    <HiOutlineStatusOnline
                      size={20}
                      style={{ marginLeft: "3px" }}
                    />
                  </Typography>
                ) */}
                <Typography variant="body2">
                  {formatDistanceToNow(new Date(assignment.createdat), {
                    addSuffix: true,
                  })}
                </Typography>
                <Typography variant="body2">
                  Due: {format(new Date(assignment.end_date), "MM.dd.yyyy")}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" color={isLight ? "#364954" : "#E6F5FD"}>
                {assignment.name}
              </Typography>
              <Box display="flex" gap={1} alignItems="center">
                <Typography variant="subtitle1">
                  {assignment.course_progress ?? "0"} %{" "}
                </Typography>
                <Iconify icon="bx:award" sx={{ color: "#EE467A" }} />
                <Iconify icon="flat-color-icons:ok" sx={{ color: "#75CF6D" }} />
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Link
                component={NextLink}
                href={STUDENT_PATH_DASHBOARD.codePanel.workSpace(
                  assignment?.courseid
                )}
                underline="none"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "inherit",
                }}
              >
                Get Coding Now
                <Iconify
                  icon="maki:arrow"
                  width={18}
                  style={{ marginLeft: "3px" }}
                />
              </Link>
              <Link
                component={NextLink}
                href={assignmentPath}
                underline="none"
                sx={(theme) => ({
                  display: "inline-flex",
                  alignItems: "center",
                  color: theme.palette.grey[500],
                })}
              >
                See more
                <RiExternalLinkLine size={15} style={{ marginLeft: "3px" }} />
              </Link>
            </Stack>
          </Stack>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={(theme) => ({
              ml: 2,
              mr: 1,
              borderLeftWidth: "2px",
              borderColor: theme.palette.grey[500],
            })}
          />
          <Stack
            alignSelf="flex-end"
            sx={(theme) => ({
              color: theme.palette.grey[500],
              flexDirection: { xs: "row", sm: "row", md: "column" },
            })}
          >
            {/* hided before release */}
            {/* <IconButton
              sx={{ alignSelf: "flex-end" }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                pinTomblerAssignment();
              }}
            > */}
            {/* uncomment when pin \ unpin will work */}
            {/* {isLoadingPin || isLoadingUnpin ? (
                <CircularProgress variant="indeterminate" size={20} />
              ) : !assignment?.pined ? (
                <Iconify icon="bi:pin-fill" width={22} />
              ) : (
                <Iconify icon="bi:pin" width={22} />
              )} */}
            {/* <Iconify icon="bi:pin" width={22} />
            </IconButton> */}
            <Stack direction="row">
              {/* <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Iconify icon="ion:share-outline" width={22} />
              </IconButton> */}
              <RoleBasedGuard
                roles={[Role.Admin, Role.Manager, Role.Owner, Role.Editor]}
              >
                <IconButton onClick={handleOpenPopover}>
                  <Iconify icon="pepicons-pop:dots-y" width={22} />
                </IconButton>
              </RoleBasedGuard>
            </Stack>
          </Stack>
        </Stack>
      </Link>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        disabledArrow
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: -5, horizontal: 5 }}
      >
        <Link
          component={NextLink}
          href={editAssignmentPath}
          underline="none"
          color={isLight ? "initial" : "#E6F5FD"}
        >
          <MenuItem>
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        </Link>
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
          <LoadingButton
            variant="contained"
            color="error"
            onClick={onDelete}
            loading={isDeleting}
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
