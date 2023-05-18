import Image from "@components/image/Image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Stack, Typography } from "@mui/material";
interface Props {
  img: string;
  title: string;
  subtitle: string;
  goToStep?: (step: number) => void;
}

export function LanguageItem({
  img,
  title,
  subtitle,
  goToStep,
}: Props): React.ReactElement {
  return (
    <Button
      onClick={() => {
        goToStep?.(5);
      }}
      sx={{
        color: "inherit",
        borderRadius: "15px",
      }}
    >
      <Stack direction="row" alignItems="center">
        <Box sx={{ display: "flex", minWidth: "50px", height: "50px" }}>
          <Image alt={title} src={img} />
        </Box>
        <Stack sx={{ ml: 2, maxWidth: "320px", alignItems: "flex-start" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" sx={{ textAlign: "start" }}>
            {subtitle}
          </Typography>
        </Stack>

        <ArrowForwardIosIcon fontSize="large" />
      </Stack>
    </Button>
  );
}
