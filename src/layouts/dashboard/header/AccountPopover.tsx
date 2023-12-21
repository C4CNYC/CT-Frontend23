import { useRouter } from "next/router";
import { useState } from "react";

import { useDispatch } from "react-redux";

import {
  Box,
  Divider,
  MenuItem,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import {
  CustomAvatar,
  IconButtonAnimate,
  MenuPopover,
  useSnackbar,
} from "@components";
import {
  MANAGER_PATH_DASHBOARD,
  MANAGER_PATH_PAGE,
} from "@routes/manager.paths";
import { PATH_AUTH } from "@routes/paths";
import { STUDENT_PATH_PAGE } from "@routes/student.paths";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { useProfileQuery } from "src/redux/services/auth";
import { Role } from "src/redux/services/enums/role.enum";
import { setStudentMode } from "src/redux/slices/global";

import { useAuthContext } from "../../../auth/useAuthContext";

export default function AccountPopover(): React.ReactElement {
  const reduxDispatch = useDispatch();
  const { pathname } = useRouter();
  // eslint-disable-next-line @typescript-eslint/prefer-includes
  const isStudentMode = /\/student/.test(pathname);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const { logout } = useAuthContext();
  const { replace, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data: profile, isLoading } = useProfileQuery();

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleLogout = (): void => {
    try {
      logout();
      replace(PATH_AUTH.signIn);
      setOpenPopover(null);
    } catch (error: any) {
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path: string): void => {
    setOpenPopover(null);
    push(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src={
            profile?.avatar
          }
          alt={
            profile?.first_name
          }
          name={
            profile?.first_name
          }
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={() => {
          setOpenPopover(null);
        }}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {!isLoading ? (
            <Typography variant="subtitle2" noWrap>
              {`${profile?.first_name} ${profile?.last_name}`}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" height="20px" sx={{ mb: "4px" }} />
          )}
          {!isLoading ? (
            <Tooltip
              title={
                profile?.email && profile?.email.length > 21 ? (
                  <Typography variant="body2">{profile?.email}</Typography>
                ) : (
                  ""
                )
              }
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {profile?.email}
              </Typography>
            </Tooltip>
          ) : (
            <Skeleton variant="rectangular" height="20px" />
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem
            onClick={() => {
              handleClickItem(
                STUDENT_PATH_PAGE.profile
              );
            }}
          >
            Profile
          </MenuItem>
        </Stack>

        <RoleBasedGuard roles={[Role.Owner, Role.Admin, Role.Manager]}>
          <Stack sx={{ p: 1 }}>
            <MenuItem
              onClick={() => {
                handleClickItem(
                  isStudentMode
                    ? MANAGER_PATH_PAGE.home
                    : STUDENT_PATH_PAGE.home
                );
                reduxDispatch(setStudentMode(!isStudentMode));
              }}
            >
              {isStudentMode ? "Manager Account" : "Student Account"}
            </MenuItem>
          </Stack>
        </RoleBasedGuard>

        <RoleBasedGuard roles={[Role.Owner]}>
          <Stack sx={{ p: 1 }}>
            <MenuItem
              onClick={() => {
                handleClickItem(MANAGER_PATH_DASHBOARD.organization.general);
              }}
            >
              Organization Setting
            </MenuItem>
          </Stack>
        </RoleBasedGuard>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
