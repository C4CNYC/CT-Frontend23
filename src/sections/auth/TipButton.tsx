import { MenuPopover } from "@components";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { IconButton } from "@mui/material";
import { useState } from "react";

interface Props {
  tip: string;
}

export default function TipButton({ tip }: Props): React.ReactElement {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = async (
    event: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(null);
  };
  return (
    <>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="top-center"
        sx={{ width: "300px" }}
      >
        {tip}
      </MenuPopover>
      <IconButton
        onClick={handleOpenPopover}
        aria-label="info"
        sx={{
          position: "absolute",
          right: "-40px",
          padding: "10px",
          backgroundColor: "#FBDD3F",
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <EmojiObjectsIcon sx={{ color: "#000" }} />
      </IconButton>
    </>
  );
}
