import {
  CustomAvatar,
  IconButtonAnimate,
  MenuPopover,
  useSnackbar,
} from "@components";
import {
  Box,
  Divider,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { PATH_AUTH, PATH_PAGE } from "@routes/paths";
import { useRouter } from "next/router";
import { useState } from "react";
import { useProfileQuery } from "src/redux/services/auth";
import { RootState, useSelector } from "src/redux/store";
import { useAuthContext } from "../../../auth/useAuthContext";
import { ProfileType } from "src/redux/services/enums/profile.enum";
import { MANAGER_PATH_PAGE } from "@routes/manager.paths";
import { STUDENT_PATH_PAGE } from "@routes/student.paths";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { Role } from "src/redux/services/enums/role.enum";
import { setStudentMode } from "src/redux/slices/global";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

export default function AccountPopover(): React.ReactElement {
  const reduxDispatch = useDispatch();
  const isStudentMode = useSelector((state: RootState) => state.global.isStudent);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const { logout } = useAuthContext();
  const { replace, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data: profile } = useProfileQuery(
    isStudentMode
      ? ProfileType.STUDENT
      : ProfileType.MANAGER
  );

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleLogout = (): void => {
    try {
      logout();
      replace(PATH_AUTH.login);
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
          src={profile?.avatar}
          alt={profile?.first_name}
          name={profile?.first_name}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={() => { setOpenPopover(null); }}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profile?.first_name}
          </Typography>
          <Tooltip
            title={
              profile?.email && profile?.email.length > 21 ? (
                <Typography variant="body2">{profile?.email} </Typography>
              ) : (
                ""
              )
            }
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {profile?.email}
            </Typography>
          </Tooltip>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem
            onClick={() => {
              handleClickItem(
                isStudentMode
                  ? STUDENT_PATH_PAGE.profile
                  : MANAGER_PATH_PAGE.profile
              );
            }}
          >
            Profile
          </MenuItem>
        </Stack>

        <RoleBasedGuard
          roles={[
            Role.Owner,
            Role.Admin,
            Role.Manager
          ]}
        >
          <Stack sx={{ p: 1 }}>
            <MenuItem
              onClick={() => {
                handleClickItem(
                  isStudentMode
                    ? MANAGER_PATH_PAGE.home
                    : STUDENT_PATH_PAGE.home
                );
                reduxDispatch(setStudentMode(!isStudentMode))
              }}
            >
              {
                isStudentMode
                  ? "Manager Account"
                  : "Student Account"
              }
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
