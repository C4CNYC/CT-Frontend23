import NextLink from "next/link";

import {
  Avatar,
  Link,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import SocialActivity from "./SocialActivity";

export default function AuthorsSection(): React.ReactElement {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        background:
          theme.palette.mode === "light"
            ? "#FFF0F3"
            : theme.palette.background.paper,
        borderRadius: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          background:
            theme.palette.mode === "light"
              ? "#F8F8F8"
              : theme.palette.background.neutral,
          borderRadius: 3,
          px: 3,
          py: 2,
          minWidth: "250px",
          [theme.breakpoints.down(1400)]: {
            ml: "0",
          },
        }}
      >
        <Stack direction="row" gap={3}>
          <Avatar
            alt="Jason"
            src=""
            variant="rounded"
            sx={{
              width: "60px",
              height: "60px",
              border: "2px solid #EE467A",
              mr: 2,
            }}
          />
          <Stack>
            <Typography
              noWrap
              variant="body1"
              maxWidth="150px"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              Jason Ximerinda
            </Typography>
            <Link
              component={NextLink}
              href="#"
              underline="always"
              color="#0198ED"
            >
              Bio
            </Link>
          </Stack>
        </Stack>
      </Paper>
      <SocialActivity likes={12000} rated={4300} certificate={2700} />
    </Stack>
  );
}
