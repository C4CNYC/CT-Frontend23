import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// mui
import { Stack } from "@mui/system";

export default function Slider() {
  return (
    <>
      <Stack sx={{ ml: "24px" }}>
        <Stack
          sx={{
            backgroundImage: "url(/BG.png)",
            width: "344px",
            height: "260px",
            position: "relative",
            borderRadius: "16px",
          }}
        >
          <Typography
            position="absolute"
            variant="h5"
            fontWeight="700"
            fontSize="20px"
            color="white"
            mt="132px"
            ml="24px"
          >
            Suggest a new lesson or course
          </Typography>
          <Typography
            position="absolute"
            color="white"
            variant="body2"
            fontWeight="400"
            fontSize="14px"
            width="193px"
            mt="170px"
            ml="24px"
          >
            Ask us to create a new lesson. Add your suggestion to Google Form
          </Typography>

          <IconSlider />

          <Stack display="flex" direction="row" mt="27px" ml="275px">
            <IconButton style={{ width: "2px", height: "2px" }}>
              <ArrowLeftIcon fontSize="small" sx={{ color: "gray" }} />
            </IconButton>
            <IconButton style={{ width: "2px", height: "2px" }}>
              <ArrowRightIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

function IconSlider() {
  return (
    <Stack
      display="flex"
      direction="row"
      spacing="8px"
      position="absolute"
      mt="223px"
      ml="251px"
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
