import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// mui
import { Stack } from "@mui/system";

export default function Slider() {
  return (
    <Stack
      sx={{
        background: {
          xs: "url(/BG.png) center  / cover no-repeat",
          sm: "url(/BG.png) center  / contain no-repeat",
        },
        width: "100%",
        maxWidth: { xs: "344px", sm: "344px", md: "344px" },
        height: "260px",
        position: "relative",
        borderRadius: 2,
        justifyContent: "space-between",
        pb: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{ width: "100%", justifyContent: "flex-end", pt: 2, pr: 2 }}
      >
        <IconButton style={{ width: "2px", height: "2px" }}>
          <ArrowLeftIcon fontSize="small" sx={{ color: "gray" }} />
        </IconButton>
        <IconButton style={{ width: "2px", height: "2px" }}>
          <ArrowRightIcon fontSize="small" sx={{ color: "white" }} />
        </IconButton>
      </Stack>
      <Stack>
        <Typography
          variant="h5"
          sx={{
            color: "#fff",

            ml: 3,
          }}
        >
          Suggest a new lesson or course
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            maxWidth: "190px",
            ml: 3,
          }}
        >
          Ask us to create a new lesson. Add your suggestion to Google Form
        </Typography>
      </Stack>
      <IconSlider />
    </Stack>
  );
}

function IconSlider() {
  return (
    <Stack
      display="flex"
      direction="row"
      sx={{ bottom: "16px", right: "24px", gap: "8px", position: "absolute" }}
    >
      <FiberManualRecordIcon
        sx={{
          width: "8px",
          height: "8px",
          color: "#02D3D7",
          opacity: "32%",
        }}
      />
      <FiberManualRecordIcon
        sx={{ width: "8px", height: "8px", color: "#02D3D7" }}
      />
      <FiberManualRecordIcon
        sx={{
          width: "8px",
          height: "8px",
          color: "#02D3D7",
          opacity: "32%",
        }}
      />
      <FiberManualRecordIcon
        sx={{
          width: "8px",
          height: "8px",
          color: "#02D3D7",
          opacity: "32%",
        }}
      />
    </Stack>
  );
}
