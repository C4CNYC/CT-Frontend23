import { useState } from "react";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import Diversity1Icon from "@mui/icons-material/Diversity1";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { Image } from "@components";

interface Props {
  children: React.ReactElement;
}

export default function MenuHugDialog({ children }: Props): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);
  const openDialog = (): void => {
    setOpen(true);
  };

  const closeDialog = (): void => {
    setOpen(false);
  };
  return (
    <>
      <Box onClick={openDialog}>{children}</Box>
      <Dialog
        open={open}
        onClose={closeDialog}
        PaperProps={{
          sx: {
            maxWidth: "400px",
          },
        }}
        scroll="body"
      >
        <DialogTitle variant="h4">BIG, BIIGGGGGGG HUGGG!!!</DialogTitle>
        <DialogContent>
          <Image src={"/assets/code-panel/hug.png"} alt="code-panel" />
          <Typography variant="h5" sx={{ py: 1 }}>
            You are loved, needed and important. This world needs more people
            exactly like you.
          </Typography>
          <Collapse in={isShown}>
            <Typography variant="subtitle1">
              Go and be the best YOU you can be 😊. There is a special plan JUST
              for your life. It’s going to be astounding and you’re going to
              love it. It's your job to find out what the plan is. God loves you
              and is going to take care of you. I promise.
            </Typography>
          </Collapse>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => {
              setIsShown(!isShown);
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              See more
            </Typography>
            {isShown ? (
              <SlArrowUp style={{ marginBottom: "-10px" }} />
            ) : (
              <SlArrowDown style={{ marginBottom: "-10px" }} />
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              py: 4,
            }}
          >
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              I`m not sure
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
              sx={{ minWidth: "115px" }}
            >
              <Diversity1Icon />
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
