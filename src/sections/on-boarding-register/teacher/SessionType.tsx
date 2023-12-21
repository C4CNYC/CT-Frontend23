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
import { useTranslate } from "src/utils/translateHelper";

import { getImageWrapperSx } from "./constants";

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
  const translate = useTranslate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ pr: { xs: 0, sm: 0, md: 1 } }}
    >
      <Tooltip
        title={<Typography>{translate(info)}</Typography>}
        placement="top-end"
      >
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          color="info"
          badgeContent={"i"}
          invisible={isSmall}
        >
          <Box sx={() => ({ ...getImageWrapperSx(color) })}>
            <Image src={img} alt="hello step" />
          </Box>
        </Badge>
      </Tooltip>
      <Stack sx={{ pl: 2 }}>
        {disabled ? (
          <Badge
            sx={{ "& .MuiBadge-anchorOriginTopRight": { top: -10 } }}
            badgeContent={translate("coming_soon")}
            color="success"
          >
            <Typography variant="h4" textAlign="start" gutterBottom>
              {translate(title)}
            </Typography>
          </Badge>
        ) : (
          <Typography variant="h4" textAlign="start" gutterBottom>
            {translate(title)}
          </Typography>
        )}

        <Typography
          variant="body2"
          textAlign="start"
          sx={{ maxWidth: "250px" }}
        >
          {translate(subtitle)}
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
