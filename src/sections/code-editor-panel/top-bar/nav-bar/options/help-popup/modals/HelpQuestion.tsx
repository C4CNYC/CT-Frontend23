import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

import { Iconify } from "@components";

interface IHelpQuestion {
  children: React.ReactElement;
}

const HelpQuestionModal = ({ children }: IHelpQuestion): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>

      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <DialogContent sx={DIALOG_CONTENT_STYLES}>
          <Typography mb="15px" variant="h4">
            I NEED HELP WITH...
          </Typography>

          <Typography variant="subtitle2">What are you stuck with?</Typography>

          <Typography mb="30px" variant="subtitle2">
            What's the question? 👀
          </Typography>

          <TextField
            multiline
            fullWidth
            rows={6}
            placeholder="I have question about ..."
            // TODO-PH add value after creating new chat
            value={""}
            onChange={() => {}}
          />
        </DialogContent>

        <DialogActions sx={DIALOG_ACTIONS_STYLES}>
          <Button
            variant="outlined"
            // TODO-PH add after integration new chat
            onClick={() => {}}
          >
            SEND
            <Iconify ml={1} icon="ic:round-send" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const DIALOG_CONTENT_STYLES = {
  textAlign: "center",
  p: "30px 40px 20px",
}

const DIALOG_ACTIONS_STYLES = {
  justifyContent: "end",
  textAlign: "center",
  padding: "24px 38px!important",
}

export default HelpQuestionModal;
