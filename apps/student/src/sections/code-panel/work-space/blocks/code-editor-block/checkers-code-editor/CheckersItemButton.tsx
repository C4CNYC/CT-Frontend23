import { Iconify } from "@ct-nx/components";
import { IconButton, ListItem } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { checkersAnimationAtom } from "./checkers-animation-atom";
import CheckersItemText from "./CheckersItemText";

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
