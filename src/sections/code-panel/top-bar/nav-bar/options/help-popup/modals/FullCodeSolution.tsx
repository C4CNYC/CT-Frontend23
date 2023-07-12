import { useState } from "react";

import { useAtom } from "jotai";
import { CopyBlock, dracula } from "react-code-blocks";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

import { globalCodePanelAtom } from "@sections/code-panel/atoms/global-code-panel.atom";

interface IFullCodeSolutionModal {
  children: React.ReactElement;
  disabled: boolean;
}

const FullCodeSolutionModal = ({
  children,
  disabled,
}: IFullCodeSolutionModal): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleShowContent = (): void => {
    setShowContent(true);
  };

  return (
    <>
      <Button
        disabled={disabled}
        onClick={handleOpen}
        sx={{
          padding: 0,
          "&:hover": {
            background: "none",
          },
        }}
      >
        {children}
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        {showContent ? <CodeContent /> : <QuestionContent />}
        <DialogActions
          sx={{
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {showContent ? (
            <Button variant="outlined" onClick={handleClose}>
              OK
            </Button>
          ) : (
            <Stack mb="20px" direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleShowContent}>
                YES
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                NO
              </Button>
              <Button variant="outlined" onClick={handleClose} autoFocus>
                LET ME TRY AGAIN
              </Button>
            </Stack>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

const CodeContent = (): React.ReactElement => {
  const [{ solutionCode }] = useAtom(globalCodePanelAtom);
  return (
    <DialogContent
      sx={{
        textAlign: "center",
        p: "30px 20px 20px",
      }}
    >
      <Typography mb="30px" variant="h4">
        TRAINING SOLUTION CODE
      </Typography>
      <CopyBlock
        text={solutionCode}
        language="html"
        theme={dracula}
        wrapLines
        customStyle={{
          textAlign: "left",
          height: "250px",
          overflowY: "scroll",
          borderRadius: "0",
          boxShadow: "none",
          fontSize: "0.75rem",
        }}
      />
    </DialogContent>
  );
};

const QuestionContent = (): React.ReactElement => {
  return (
    <DialogContent
      sx={{
        textAlign: "center",
        p: "30px 15px 20px",
      }}
    >
      <Typography mb="30px" variant="h4">
        FULL CODE SOLUTION
      </Typography>
      <Typography variant="subtitle2">
        Are you sure you want to see the full solution code for this lesson?
      </Typography>
    </DialogContent>
  );
};

export default FullCodeSolutionModal;
