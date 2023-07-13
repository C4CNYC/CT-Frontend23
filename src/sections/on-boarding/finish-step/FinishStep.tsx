import { FaRegSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdModeEdit, MdOutlineArrowBackIos } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Image } from "@components";
import { voidFunction } from "@utils";

import StepContainer from "../StepContainer";

function FinishStep({
  previousStep,
}: Partial<StepWizardChildProps>): React.ReactElement {
  return (
    <StepContainer>
      <Stack>
        <Box>
          <IconButton
            onClick={() => {
              previousStep?.();
            }}
            sx={{
              position: "absolute",
              top: "5px",
              left: "10px",
              width: "50px",
              height: "50px",
              zIndex: 10,
            }}
          >
            <MdOutlineArrowBackIos size="30px" color="#616161" />
          </IconButton>
          <IconButton
            onClick={voidFunction}
            sx={{
              position: "absolute",
              top: "5px",
              right: "10px",
              width: "50px",
              height: "50px",
              zIndex: 10,
            }}
          >
            <IoMdClose size="30px" color="#616161" />
          </IconButton>
        </Box>
        <Box sx={{ pl: { xs: 8, sm: 3 }, py: 2 }}>
          <Typography variant="h3">
            Edit <MdModeEdit size={20} style={{ marginLeft: "10px" }} />
          </Typography>
          <Typography variant="body2">Update the header and title</Typography>
        </Box>
        <TextField
          id="filled-basic"
          variant="filled"
          fullWidth
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: "1.5rem",
              color: "#616161",
              "& .MuiInputBase-input": {
                py: 1,
                px: 2,
              },
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", pl: 1, py: 2, maxWidth: "400px" }}
        >
          Your header is an HTML banner which you can edit later. Select a
          starting pattern.
        </Typography>
        <Box
          sx={{
            background: "#F0EEEE80",
            borderRadius: "15px",
            py: { xs: 2, sm: 4 },
            px: 2,
            display: "flex",
            gap: { xs: 2, sm: 3 },
            flexWrap: "wrap",
            justifyContent: { xs: "flex-start", sm: "space-between" },
            maxWidth: "430px",
          }}
        >
          {Array.from("1111").map((el, i) => (
            <Button
              key={i + 10}
              sx={{
                background: "#43D4DD33",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "15px",
                minWidth: "80px",
                height: "80px",
              }}
            >
              <Image
                src="/assets/on-boarding/fire.svg"
                width={50}
                height={50}
                alt=""
              />
            </Button>
          ))}
          {Array.from("1111").map((el, i) => (
            <Button
              key={i + 11}
              sx={{
                background: "#EE467A33",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "15px",
                minWidth: "80px",
                height: "80px",
              }}
            >
              <Image
                src="/assets/on-boarding/game.svg"
                width={50}
                height={50}
                alt=""
              />
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            width: "100%",
            my: "20px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#616161",
              background: "#61616133",
              border: "2px solid #61616133",
              "&:hover": {
                background: "#fff",
                boxShadow: "none",
                border: "2px solid #61616133",
              },
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#43D4DD",
              background: "#43D4DD33",
              border: "2px solid #43D4DD33",
              "&:hover": {
                background: "#fff",
                boxShadow: "none",
                border: "2px solid #43D4DD33",
              },
            }}
          >
            SAVE{" "}
            <FaRegSave
              size="20px"
              color="#43D4DD"
              style={{ marginLeft: "5px" }}
            />
          </Button>
        </Box>
      </Stack>
    </StepContainer>
  );
}

export default FinishStep;
