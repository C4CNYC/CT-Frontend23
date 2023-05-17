import Iconify from "@components/iconify/Iconify";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import StepContainer from "../StepContainer";
import { InviteCover } from "./InviteCover";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import { useAtom } from "jotai";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";
import { roadAtom } from "../road-atom";

function IviteStep({
  previousStep,
  nextStep,
  goToStep,
}: Partial<StepWizardChildProps>) {
  const { enqueueSnackbar } = useSnackbar();
  const [value] = useState("me.codetribe.com/join/AHJ123");
  const [{ sessionWay }] = useAtom(roadAtom);

  const { copy } = useCopyToClipboard();

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar("Copied!");
      copy(text);
    }
  };

  return (
    <StepContainer>
      <InviteCover />
      <IconButton
        onClick={() => {
          if (sessionWay) {
            goToStep?.(2);
          } else {
            previousStep?.();
          }
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
        <MdOutlineArrowBackIos size="30px" color="#FFF" />
      </IconButton>
      <Stack sx={{ pl: 3, pt: "190px" }}>
        <Typography variant="h3">Select a Language</Typography>
        <Typography variant="body1" sx={{ display: "inline-flex", pb: 1 }}>
          Chose the project you will be using
        </Typography>
      </Stack>

      <Box
        sx={{
          background: "#F0EEEE80",
          p: 1,
          pl: 2,
          borderRadius: 2,
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Iconify icon="akar-icons:link-chain" width={22} mt="3px" />
          <Box>
            <Typography variant="subtitle1">JOIN-LINK</Typography>
            <Typography variant="body1">
              me.codetribe.com/join/AHJ123
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Copy">
          <Button
            onClick={() => {
              onCopy(value);
            }}
            sx={{ fontSize: "1.2rem", justifySelf: "flex-end", ml: 3 }}
          >
            COPY
            <Iconify icon="eva:copy-fill" width={24} ml={"5px"} />
          </Button>
        </Tooltip>
      </Box>
      <Button
        sx={{
          mt: "5px!important",
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <Typography variant="body2">QR Code</Typography>
        <Iconify icon="material-symbols:qr-code-2" width={20} />
      </Button>
      <RadioGroup>
        <FormControlLabel
          value="end"
          control={<Radio size="medium" />}
          label={
            <Typography variant="subtitle1">
              Anyone with the link can join
            </Typography>
          }
        />
        <FormControlLabel
          value="end"
          control={<Radio size="medium" />}
          label={
            <Typography variant="subtitle1">
              Only people you approve can join
            </Typography>
          }
        />
      </RadioGroup>
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          gap: 2,
          maxHeight: "56px",
          mb: "35px!important",
        }}
      >
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={() => ""}
          popupIcon={<ExpandMoreIcon />}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select other languages"
              margin="none"
            />
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={false}
          onClick={() => {
            nextStep?.();
          }}
          sx={{
            color: "#EAEAEB",
            fontSize: "1.5rem",
          }}
        >
          GO <ArrowForwardIosIcon />
        </LoadingButton>
      </Stack>
    </StepContainer>
  );
}
export default IviteStep;
