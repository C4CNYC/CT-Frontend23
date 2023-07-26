import {
  Badge,
  Box,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Image } from "@components";

interface Props {
  title: string;
  subtitle: string;
  img: string;
  info: string;
  color: string;
  disabled?: boolean;
}

export function SessionType({
  title,
  subtitle,
  img,
  info,
  color,
  disabled,
}: Props): React.ReactElement {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ pr: { xs: 0, sm: 0, md: 1 } }}
    >
      <Tooltip title={info} placement="top-end">
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          color="info"
          badgeContent={"i"}
          invisible={isSmall}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              background: color,
              borderRadius: "15px",
              mr: 1,
              p: 1.5,
              alignItems: "center",
              justifyContent: "center",
              minWidth: "100px",
              width: "100px",
              height: "100px",
            }}
          >
            <Image src={img} alt="hello step" />
          </Box>
        </Badge>
      </Tooltip>
      <Stack sx={{ pl: 2 }}>
        {disabled ? (
          <Badge badgeContent={"coming soon"} color="success">
            <Typography variant="h4" textAlign="start" gutterBottom>
              {title}
            </Typography>
          </Badge>
        ) : (
          <Typography variant="h4" textAlign="start" gutterBottom>
            {title}
          </Typography>
        )}

        <Typography
          variant="body2"
          textAlign="start"
          sx={{ maxWidth: "250px" }}
        >
          {subtitle}
        </Typography>
      </Stack>

      <Image
        src="/assets/on-boarding/arrow.svg"
        alt="arrow image"
        sx={{ width: "38px", height: "60px" }}
      />
    </Stack>
  );
}
