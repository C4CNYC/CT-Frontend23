import { type FC } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { AiOutlineCode } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import { Iconify } from "@components";
import { useSelector } from "src/redux/store";
import {
  COPY_BLOCK_CUSTOM_STYLES,
  DIALOG_CONTENT_SX,
  DIALOG_PAPER_PROPS,
  DIALOG_TITLE_SX,
  DIALOG_TITLE_TYP_SX,
  ICON_BUTTON_SX,
  NO_SOLUTION_TEXT
} from "./constants";

interface SolutionMobileDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SolutionMobileDialog: FC<SolutionMobileDialogProps> = ({
  open,
  onClose,
}) => {
  const solutionCode = useSelector((state) => state.codePanelGlobal.solutionCode)

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        PaperProps={DIALOG_PAPER_PROPS}
      >
        <DialogTitle sx={DIALOG_TITLE_SX}>
          <AiOutlineCode size="30px" color="#EE467A" />

          <Typography variant="h5" sx={DIALOG_TITLE_TYP_SX}>
            Solution
          </Typography>

          <IconButton onClick={onClose} sx={ICON_BUTTON_SX}>
            <Iconify width="20px" icon="ic:round-close" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={DIALOG_CONTENT_SX}>
          <CopyBlock
            text={solutionCode || NO_SOLUTION_TEXT}
            language="html"
            theme={dracula}
            wrapLines
            customStyle={COPY_BLOCK_CUSTOM_STYLES}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SolutionMobileDialog
