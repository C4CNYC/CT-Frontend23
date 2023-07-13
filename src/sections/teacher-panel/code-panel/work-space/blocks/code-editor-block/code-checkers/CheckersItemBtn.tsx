import { Dispatch, SetStateAction } from "react";

import { Box, IconButton, ListItem } from "@mui/material";

import { Iconify } from "@components";

import { CheckersItemText } from "../checkers/checkers-item-text";

interface Props {
  active: boolean;
  name: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CheckersItemBtn({
  active,
  name,
  open,
  setOpen,
}: Props): React.ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        alignItems: "center",
        p: 0,
      }}
    >
      <ListItem
        sx={{ pr: "21px" }}
        secondaryAction={
          <IconButton
            sx={{ padding: "4px", position: "relative" }}
            onClick={() => {
              setOpen(!open);
            }}
            edge="end"
          >
            {active ? (
              <Iconify
                sx={{ "& path": { fill: "#648afc" } }}
                icon="file-icons:test-generic"
              />
            ) : (
              <Iconify
                sx={{ "& path": { fill: "#75CF6D" } }}
                icon="icon-park-solid:success"
              />
            )}
          </IconButton>
        }
      >
        <CheckersItemText text={name} open={open} />
      </ListItem>
    </Box>
  );
}
