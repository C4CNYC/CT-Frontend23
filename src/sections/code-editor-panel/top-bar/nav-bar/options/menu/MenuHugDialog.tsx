import { type FC, ReactNode, useState } from "react";

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
import { useTranslate } from "src/utils/translateHelper";

interface MenuHugDialogProps {
  children: ReactNode | ReactNode[];
}

const MenuHugDialog: FC<MenuHugDialogProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);
  const openDialog = (): void => {
    setOpen(true);
  };
  const translate = useTranslate();

  const closeDialog = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={openDialog}>{children}</Box>

      <Dialog
        open={open}
        onClose={closeDialog}
        PaperProps={DIALOG_PROPS}
        scroll="body"
      >
        <DialogTitle variant="h4">BIG, BIIGGGGGGG HUGGG!!!</DialogTitle>

        <DialogContent>
          <Image src={"/assets/code-panel/hug.png"} alt="code-panel" />

          <Typography variant="h5" sx={{ py: 1 }}>
            {translate("you_are_loved")}
          </Typography>

          <Collapse in={isShown}>
            <Typography variant="subtitle1">
              {translate("go_and_be_the_best")}
            </Typography>
          </Collapse>

          <Box
            sx={SEE_MORE_BOX_STYLES}
            onClick={() => {
              setIsShown(!isShown);
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {translate("actions_see_more")}
            </Typography>

            {isShown ? (
              <SlArrowUp style={ARROW_STYLES} />
            ) : (
              <SlArrowDown style={ARROW_STYLES} />
            )}
          </Box>

          <Box sx={NOT_SURE_BOX_STYLES}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              {translate("i_not_sure")}
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
              sx={DIVERSITY_BTN_STYLES}
            >
              <Diversity1Icon />
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ARROW_STYLES = {
  marginBottom: "-10px",
};

const SEE_MORE_BOX_STYLES = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  "&:hover": { cursor: "pointer" },
};

const NOT_SURE_BOX_STYLES = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  py: 4,
};

const DIALOG_PROPS = {
  sx: {
    maxWidth: "400px",
  },
};

const DIVERSITY_BTN_STYLES = {
  minWidth: "115px",
};

export default MenuHugDialog;
