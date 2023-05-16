import Image from "@components/image/Image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Stack, Typography } from "@mui/material";
interface Props {
  img: string;
  title: string;
  subtitle: string;
}

export function LanguageItem({
  img,
  title,
  subtitle,
}: Props): React.ReactElement {
  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ display: "flex", minWidth: "50px", height: "50px" }}>
        <Image alt={title} src={img} />
      </Box>
      <Stack sx={{ ml: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{subtitle}</Typography>
      </Stack>
      <IconButton sx={{ width: "40px", height: "40px", color: "#EAEAEB" }}>
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
    </Stack>
  );
}
