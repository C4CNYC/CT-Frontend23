// @mui
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import { CustomAvatar, Image } from "@components";
// utils
import { bgBlur } from "@utils";
import { OrganizationResponce } from "src/redux/services/interfaces/organization.interface";

// auth
import { useAuthContext } from "../../../../auth/useAuthContext";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  "&:before": {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const StyledInfo = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function ProfileCover({
  name,
  cover,
  avatar,
  email,
}: Pick<
  OrganizationResponce,
  "email" | "name" | "cover" | "avatar"
>): React.ReactElement | null {
  const { user } = useAuthContext();
  return (
    <StyledRoot>
      <StyledInfo>
        <CustomAvatar
          src={avatar}
          alt={user?.displayName}
          name={user?.displayName}
          sx={{
            mx: "auto",
            borderWidth: 2,
            objectFit: "contain",
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">{name}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{email}</Typography>
        </Box>
      </StyledInfo>
      <Image
        alt="cover"
        src={cover}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
    </StyledRoot>
  );
}
