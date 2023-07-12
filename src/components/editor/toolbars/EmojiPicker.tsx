import React, { MouseEventHandler, useCallback, useState } from "react";

import { useCommands } from "@remirror/react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { BsEmojiSmile } from "react-icons/bs";
import "remirror/styles/all.css";

import { Box, Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

export default function EmojiPickerBtn(): React.ReactElement {
  const allCommand = useCommands();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e: any) => {
      e.preventDefault();
    },
    []
  );

  const emojiClickHandler = (emojiData: EmojiClickData): void => {
    allCommand.insertText(emojiData.emoji);
  };
  const onOpenMenu = (): void => {
    setShowMenu(true);
  };
  const closeMenu = (): void => {
    setShowMenu(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  return (
    <Stack ref={ref} sx={{ position: "relative", alignItems: "center" }}>
      <style>
        {`
            aside.EmojiPickerReact.epr-main {
                z-index: 1000;
            }
        `}
      </style>
      <ToggleButton
        value="left"
        key="left"
        onMouseDown={handleMouseDown}
        onClick={onOpenMenu}
        sx={{ p: "5px" }}
      >
        <BsEmojiSmile size="20px" />
      </ToggleButton>
      {showMenu && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-480px",
            left: "-150px",
          }}
        >
          <EmojiPicker
            width={300}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(emojiData: EmojiClickData) => {
              emojiClickHandler(emojiData);
            }}
          />
        </Box>
      )}
    </Stack>
  );
}
