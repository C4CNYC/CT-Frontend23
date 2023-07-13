import { useState } from "react";

import { useAtom } from "jotai";
import { useSnackbar } from "notistack";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { StepWizardChildProps } from "react-step-wizard";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Iconify } from "@components";
import { useCopyToClipboard } from "@hooks";

import StepContainer from "../StepContainer";
import { roadAtom } from "../road-atom";
import { InviteCover } from "./InviteCover";
import QrCodeDialog from "./QrCodeDialog";

function IviteStep({
  previousStep,
  nextStep,
  goToStep,
}: Partial<StepWizardChildProps>): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [value] = useState("me.codetribe.com/join/AHJ123");
  const [{ sessionWay }] = useAtom(roadAtom);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { copy } = useCopyToClipboard();

  const onCopy = (text: string): void => {
    if (text) {
      enqueueSnackbar("Copied!");
      copy(text);
    }
  };

  return (
    <StepContainer>
      <Stack>
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
        <Stack sx={{ pt: "210px" }}>
          <Typography variant="h3">Select a Language</Typography>
          <Typography variant="body1" sx={{ display: "inline-flex", pb: 1 }}>
            Chose the project you will be using
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: 2,
            pt: 2,
          }}
        >
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
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Iconify
                icon="akar-icons:link-chain"
                sx={{
                  width: "22px",
                  mt: "3px",
                  display: { xs: "none", sm: "block" },
                }}
              />
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
                sx={{
                  fontSize: "1.2rem",
                  justifySelf: "flex-end",
                  alignSelf: { xs: "flex-end", sm: "center" },
                  ml: 3,
                }}
              >
                COPY
                <Iconify icon="eva:copy-fill" width={24} ml={"5px"} />
              </Button>
            </Tooltip>
          </Box>
          <QrCodeDialog>
            <Button sx={{ borderRadius: "15px", ml: { xs: 3, sm: 0 } }}>
              {isSmall ? "QR Code" : ""}
              <Iconify
                icon="material-symbols:qr-code-2"
                width={isSmall ? 20 : 40}
                sx={{ ml: { xs: 1, sm: 0 } }}
              />
            </Button>
          </QrCodeDialog>
        </Box>
        <RadioGroup sx={{ pl: 3, pt: { xs: 1, sm: 3 } }}>
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
            my: { xs: 2, sm: 4 },
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
      </Stack>
    </StepContainer>
  );
}
export default IviteStep;
