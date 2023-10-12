import { type FC, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

import { useSelector } from "src/redux/store";

import {
  BUTTON_STYLES,
  CODE_BLOCK_CUSTOM_STYLES,
  DIALOG_ACTIONS_STYLES,
  DIALOG_CONTENT_STYLES
} from './constants'

interface IFullCodeSolutionModal {
  children: React.ReactElement;
  disabled: boolean;
}

const FullCodeSolutionModal: FC<IFullCodeSolutionModal> = ({
  children,
  disabled
})=> {
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
        sx={BUTTON_STYLES}
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
          sx={DIALOG_ACTIONS_STYLES}
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

const CodeContent: FC = () => {
  const solutionCode = useSelector((state) => (
    state.codePanelGlobal.solutionCode
  ));

  return (
    <DialogContent sx={DIALOG_CONTENT_STYLES}>
      <Typography mb="30px" variant="h4">
        TRAINING SOLUTION CODE
      </Typography>
      <CopyBlock
        text={solutionCode}
        language="html"
        theme={dracula}
        wrapLines
        customStyle={CODE_BLOCK_CUSTOM_STYLES}
      />
    </DialogContent>
  );
};

const QuestionContent: FC = () => {
  return (
    <DialogContent
      sx={DIALOG_CONTENT_STYLES}
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
