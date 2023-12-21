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
import { useTranslate } from "src/utils/translateHelper";

import {
  BUTTON_STYLES,
  CODE_BLOCK_CUSTOM_STYLES,
  DIALOG_ACTIONS_STYLES,
  DIALOG_CONTENT_STYLES,
} from "./constants";

interface IFullCodeSolutionModal {
  children: React.ReactElement;
  disabled: boolean;
}

const FullCodeSolutionModal: FC<IFullCodeSolutionModal> = ({
  children,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const translate = useTranslate();

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
      <Button disabled={disabled} onClick={handleOpen} sx={BUTTON_STYLES}>
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

        <DialogActions sx={DIALOG_ACTIONS_STYLES}>
          {showContent ? (
            <Button variant="outlined" onClick={handleClose}>
              {translate("actions_ok")}
            </Button>
          ) : (
            <Stack mb="20px" direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleShowContent}>
                {translate("actions_yes")}
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                {translate("actions_no")}
              </Button>
              <Button variant="outlined" onClick={handleClose} autoFocus>
                {translate("let_me_try")}
              </Button>
            </Stack>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

const CodeContent: FC = () => {
  const translate = useTranslate();
  const solutionCode = useSelector(
    (state) => state.codePanelGlobal.solutionCode
  );

  return (
    <DialogContent sx={DIALOG_CONTENT_STYLES}>
      <Typography mb="30px" variant="h4">
        {translate("solution_code")}
      </Typography>
      <CopyBlock
        text={solutionCode || translate("not_available_for_this_step")}
        language="html"
        theme={dracula}
        wrapLines
        customStyle={CODE_BLOCK_CUSTOM_STYLES}
      />
    </DialogContent>
  );
};

const QuestionContent: FC = () => {
  const translate = useTranslate();
  return (
    <DialogContent sx={DIALOG_CONTENT_STYLES}>
      <Typography mb="30px" variant="h4">
        {translate("full_code_solution")}
      </Typography>
      <Typography variant="subtitle2">
        {translate("are_you_sure_see_solution")}
      </Typography>
    </DialogContent>
  );
};

export default FullCodeSolutionModal;
