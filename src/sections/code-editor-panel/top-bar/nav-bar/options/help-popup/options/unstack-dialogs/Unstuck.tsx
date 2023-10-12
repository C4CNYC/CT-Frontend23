import { type FC, useState } from "react";

import {
  Checkbox,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import FullCodeSolutionModal from "../../modals/FullCodeSolution";

import {
  ASK_TEXTS,
  LIST_STYLES,
  LIST_ITEM_BTN_SX,
  LIST_ITEM_ICON_SX
} from "./constants"

const Unstuck: FC = () => {
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
      <List sx={LIST_STYLES}>
        {ASK_TEXTS.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
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
        Or, ... Keep going till you see a "Checkpoint" slide. There may be one
        ahead.
      </Typography>
    </>
  );
};

export default Unstuck;
