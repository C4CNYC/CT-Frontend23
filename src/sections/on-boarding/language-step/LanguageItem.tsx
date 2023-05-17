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
    <Stack direction="row" alignItems="center">
      <Box sx={{ display: "flex", minWidth: "50px", height: "50px" }}>
        <Image alt={title} src={img} />
      </Box>
      <Stack sx={{ ml: 2, maxWidth: "320px" }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{subtitle}</Typography>
      </Stack>
      <Button
        onClick={() => {
          goToStep?.(5);
        }}
        sx={{
          width: "40px",
          height: "40px",
          minWidth: "0",
          color: "#EAEAEB",
          alignSelf: "center",
          "&:hover": {
            color: "#A6A6A6",
          },
        }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </Button>
    </Stack>
  );
}
