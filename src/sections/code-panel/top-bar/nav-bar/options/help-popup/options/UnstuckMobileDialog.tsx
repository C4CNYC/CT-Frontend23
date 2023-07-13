import { useState } from "react";

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

import FullCodeSolutionModal from "../modals/FullCodeSolution";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function UnstuckMobileDialog({
  open,
  onClose,
}: Props): React.ReactElement {
  const [checked, setChecked] = useState<string[]>([]);

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
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        PaperProps={{
          sx: {
            maxWidth: "450px",
            maxHeight: "60vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <BsChatText size="30px" color="#43D4DD" />
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, ml: 2, alignSelf: "flex-end" }}
          >
            Get unstuck
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ selfAlign: "flex-end", mr: "-10px" }}
          >
            <Iconify width="20px" icon="ic:round-close" />
          </IconButton>
        </DialogTitle>
        <>
          <List
            sx={{
              p: 0,
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            {[
              "Ask for help in Tribe chat",
              "Re-read the Challenge",
              "Review the last few slides",
            ].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    sx={{ paddingLeft: "29px" }}
                    dense
                  >
                    <ListItemIcon sx={{ mr: "10px" }}>
                      <Checkbox
                        edge="start"
                        checked={checked.includes(value)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Box bgcolor="#eee" p="15px 29px">
            See this training's{" "}
            <FullCodeSolutionModal disabled={checked.length !== 3}>
              <Link href="#">full code solutions.</Link>
            </FullCodeSolutionModal>
          </Box>
          <Typography p="15px 29px">
            Or, ... Keep going till you see a "Checkpoint" slide. There may be
            one ahead.
          </Typography>
        </>
      </Dialog>
    </>
  );
}
