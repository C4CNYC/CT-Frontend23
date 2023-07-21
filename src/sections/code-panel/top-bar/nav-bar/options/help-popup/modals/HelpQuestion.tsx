import { useState } from "react";

import { useAtom } from "jotai";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

import { Iconify } from "@components";

import { chatHandlerAtom } from "../../chatHendlerAtom";
import { helpMsgAtom } from "./helpMsgAtom";

interface IHelpQuestion {
  children: React.ReactElement;
}

const HelpQuestionModal = ({ children }: IHelpQuestion): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [{ message }, updateAtom] = useAtom(helpMsgAtom);
  const [, setChatVisible] = useAtom(chatHandlerAtom);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const onSend = () => {
    handleClose();
    setChatVisible(true);
    updateAtom((prev) => ({ ...prev, sent: true }));
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
        <DialogContent
          sx={{
            textAlign: "center",
            p: "30px 40px 20px",
          }}
        >
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
            value={message}
            onChange={(event) => {
              updateAtom((prev) => ({ ...prev, message: event?.target.value }));
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "end",
            textAlign: "center",
            padding: "24px 38px!important",
          }}
        >
          <Button variant="outlined" onClick={onSend}>
            SEND
            <Iconify ml={1} icon="ic:round-send" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HelpQuestionModal;
