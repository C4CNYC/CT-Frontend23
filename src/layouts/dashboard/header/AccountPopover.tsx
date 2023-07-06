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
import { useEffect, useState } from "react";
import { IUser } from "src/redux/interfaces/auth.interface";
import { useProfileQuery } from "src/redux/services/auth";
import { useProfileStudentQuery } from "src/redux/services/student-auth";
import { useSelector } from "src/redux/store";
import { useAuthContext } from "../../../auth/useAuthContext";

// ----------------------------------------------------------------------

export default function AccountPopover(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuthContext();
  const { replace, push } = useRouter();
  const [profile, setProfile] = useState<IUser>();
  const isStudent = useSelector((state) => state.global.isStudent);
  const { data: profileTeacher } = useProfileQuery({}, { skip: isStudent });
  const { data: profileStudent } = useProfileStudentQuery(
    {},
    { skip: !isStudent }
  );
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  useEffect(() => {
    if (isStudent && profileStudent) {
      setProfile(profileStudent);
    }
    if (!isStudent && profileTeacher) {
      setProfile(profileTeacher);
    }
  }, [profileTeacher, profileStudent]);
  const handleLogout = (): void => {
    try {
      logout();
      replace(PATH_AUTH.login);
      handleClosePopover();
    } catch (error: any) {
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path: string): void => {
    handleClosePopover();
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
        onClose={handleClosePopover}
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
                isStudent ? PATH_PAGE.studentProfile : PATH_PAGE.profile
              );
            }}
          >
            Profile
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
