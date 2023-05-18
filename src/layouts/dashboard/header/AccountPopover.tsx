import { useState } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { Box, Divider, MenuItem, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
// routes
import { PATH_AUTH, PATH_PAGE } from "@routes/paths";
// auth
import { useAuthContext } from "../../../auth/useAuthContext";
// components
import { IconButtonAnimate } from "@components/animate";
import { CustomAvatar } from "@components/custom-avatar";
import MenuPopover from "@components/menu-popover";
import { useSnackbar } from "@components/snackbar";

// ----------------------------------------------------------------------

export default function AccountPopover(): React.ReactElement {
  const { replace, push } = useRouter();

  const { logout, user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const OPTIONS = [
    {
      label: "Profile",
      linkTo: PATH_PAGE.profile,
    },
  ];

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };

  const handleLogout = (): void => {
    try {
      logout();
      replace(PATH_AUTH.login);
      handleClosePopover();
    } catch (error) {
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
        <CustomAvatar src={user?.avatar} alt={user?.email} name={user?.email} />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => {
                handleClickItem(option.linkTo);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
