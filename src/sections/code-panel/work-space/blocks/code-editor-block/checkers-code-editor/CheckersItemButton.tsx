import { useEffect } from "react";

import { useAtom } from "jotai";

import { IconButton, ListItem } from "@mui/material";

import { Iconify } from "@components";

import CheckersItemText from "./CheckersItemText";
import { checkersAnimationAtom } from "./checkers-animation-atom";

interface Props {
  active: boolean;
  name: string;
}

export default function CheckersItemButton({
  active,
  name,
}: Props): React.ReactElement {
  const [{ openText }, setAnimation] = useAtom(checkersAnimationAtom);
  useEffect(() => {
    if (!active) {
      setAnimation((prev) => ({
        ...prev,
        activateCompeated: true,
      }));
    }
  }, [active]);
  return (
    <ListItem
      sx={{ pr: "21px", height: "40px" }}
      secondaryAction={
        <IconButton
          onClick={() => {
            setAnimation((prev) => ({
              ...prev,
              openText: !openText,
            }));
          }}
          sx={{
            padding: "3px",
            position: "relative",
          }}
          edge="end"
        >
          {active ? (
            <Iconify
              sx={{ "& path": { fill: "#000000" } }}
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
      <CheckersItemText text={name} />
    </ListItem>
  );
}
