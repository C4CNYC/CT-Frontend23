import { type FC, useState } from "react";

import { BsChatText } from "react-icons/bs";

import {
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Iconify } from "@components";
import { useTranslate } from "src/utils/translateHelper";

import FullCodeSolutionModal from "../../modals/FullCodeSolution";
import {
  ASK_TEXTS,
  DIALOG_PAPER_PROPS,
  DIALOG_TITLE_SX,
  DIALOG_TITLE_TYP_SX,
  ICON_BTN_SX,
  LIST_ITEM_BTN_SX,
  LIST_ITEM_ICON_SX,
  LIST_MOB_SX,
} from "./constants";

interface UnstuckMobileDialogProps {
  open: boolean;
  onClose: () => void;
}

const UnstuckMobileDialog: FC<UnstuckMobileDialogProps> = ({
  open,
  onClose,
}) => {
  const [checked, setChecked] = useState<string[]>([]);
  const translate = useTranslate();
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      PaperProps={DIALOG_PAPER_PROPS}
    >
      <DialogTitle sx={DIALOG_TITLE_SX}>
        <BsChatText size="30px" color="#43D4DD" />

        <Typography variant="h5" sx={DIALOG_TITLE_TYP_SX}>
          {translate("get_unstuck")}
        </Typography>

        <IconButton onClick={onClose} sx={ICON_BTN_SX}>
          <Iconify width="20px" icon="ic:round-close" />
        </IconButton>
      </DialogTitle>

      <>
        <List sx={LIST_MOB_SX}>
          {ASK_TEXTS.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  sx={LIST_ITEM_BTN_SX}
                  dense
                >
                  <ListItemIcon sx={LIST_ITEM_ICON_SX}>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(value)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>

                  <ListItemText id={labelId} primary={translate(value)} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box bgcolor="#eee" p="15px 29px">
          {translate("see_this_training")}
          <FullCodeSolutionModal disabled={checked.length !== 3}>
            <Link href="#">{translate("full_code_solutions")}</Link>
          </FullCodeSolutionModal>
        </Box>

        <Typography p="15px 29px">{translate("or_keep_goin_slide")}</Typography>
      </>
    </Dialog>
  );
};

export default UnstuckMobileDialog;
