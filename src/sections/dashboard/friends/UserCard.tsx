import NextLink from "next/link";

import { SOCIAL_ICONS } from "@assets/data";

import {
  Avatar,
  Box,
  Card,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";

import { SvgColor } from "@components";
import { STUDENT_PATH_DASHBOARD } from "@routes/student.paths";
import { IFriend } from "src/redux/interfaces/friends.interface";
import { useTranslate } from "src/utils/translateHelper";

// ----------------------------------------------------------------------

const StyledOverlay = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

interface Props {
  user: IFriend;
}

export default function UserCard({ user }: Props) {
  const theme = useTheme();
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    city,
    country,
    post_code: postCode,
    socials,
    cover,
    avatar,
  } = user;

  const translate = useTranslate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        maxHeight: { xs: "550px", sm: "470px", md: "440px", lg: "470px" },
        minHeight: { xs: "480px", sm: "450px", md: "420px", lg: "400px" },
      }}
    >
      <Box
        sx={{ flexGrow: 1, background: cover ?? theme.palette.primary.main }}
      />
      <Box sx={{ position: "relative" }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: "auto",
            position: "absolute",
            color: "background.paper",
          }}
        />
        <Link
          component={NextLink}
          href={STUDENT_PATH_DASHBOARD.friends.friend(user.id)}
          sx={{
            textDecoration: "none",
            "&:hover": {
              textDecoration: "none",
              boxShadow: 3,
            },
          }}
        >
          <Avatar
            alt={firstName}
            src={avatar}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -32,
              mx: "auto",
              position: "absolute",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          />
        </Link>
        <StyledOverlay />
      </Box>

      <Typography
        variant="subtitle1"
        sx={{ mt: 6, mb: 0.5, textTransform: "capitalize" }}
      >
        {`${firstName} ${lastName}`}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {email}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 1, mb: 2, minHeight: "36px" }}
      >
        {socials.map((link) => (
          <Stack key={link.name} direction="row" sx={{ alignItems: "center" }}>
            <Link
              sx={{
                ml: 1,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              component={NextLink}
              variant="body2"
              color="text.primary"
              target="_blank"
              href={link.link}
            >
              {SOCIAL_ICONS[link.type]}
            </Link>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            {translate("country")}
          </Typography>
          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {country ?? "N/D"}
          </Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            {translate("city")}
          </Typography>

          <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
            {city ?? "N/D"}
          </Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            {translate("profile_postcode")}
          </Typography>
          <Typography variant="subtitle1">{postCode ?? "N/D"}</Typography>
        </div>
      </Box>
    </Card>
  );
}
