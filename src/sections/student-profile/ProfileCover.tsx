import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { CustomAvatar } from "@components";
import { getLinearGradient } from "@utils";

const StyledInfo = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 15,
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

interface IProfileCoverProps {
  name: string;
  lastName?: string;
  cover?: string;
  avatar?: string;
}
export default function ProfileCover({
  name,
  lastName,
  cover,
  avatar,
}: IProfileCoverProps) {
  if (!cover) {
    cover = "#5be49b";
  }

  return (
    <Stack
      sx={{
        background: getLinearGradient(cover),
        height: "100%",
      }}
    >
      <StyledInfo>
        <CustomAvatar
          src={avatar}
          alt={name}
          name={name}
          sx={{
            mx: "auto",
            borderWidth: 2,
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
          <Typography variant="h4">
            {name}&nbsp;{lastName}
          </Typography>

          <Typography sx={{ opacity: 0.72 }}>Class</Typography>
        </Box>
      </StyledInfo>
    </Stack>
  );
}
