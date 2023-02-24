// next
import Image from "next/image";
// mui
import { Button, MobileStepper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
// icon
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// react
import { useState } from "react";

export default function Slider() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      <Stack ml="24px">
        <Typography
          position="absolute"
          zIndex="100"
          fontSize="20px"
          color="white"
          mt="132px"
          ml="24px"
          variant="h5"
        >
          Suggest a new lesson or course
        </Typography>
        <Typography
          position="absolute"
          zIndex="100"
          fontSize="14px"
          color="white"
          width="193px"
          mt="170px"
          ml="24px"
          variant="body2"
        >
          Ask us to create a new lesson. Add your suggestion to Google Form
        </Typography>
        <Stack position="relative">
          <Image
            src="/BG.png"
            alt=""
            width="344"
            height="260"
            style={{ borderRadius: "16px" }}
          ></Image>
        </Stack>
        <Stack
          display="flex"
          flexDirection="row"
          mt="27px"
          ml="275px"
          position="absolute"
        >
          <ArrowLeftIcon
            fontSize="small"
            sx={{ color: "gray", cursor: "pointer" }}
          />
          <ArrowRightIcon
            fontSize="small"
            sx={{ color: "white", cursor: "pointer" }}
          />
        </Stack>

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
      </Stack>
    </>
  );
}
