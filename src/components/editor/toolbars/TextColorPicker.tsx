import React, { MouseEventHandler, useCallback, useState } from "react";

import { useCommands } from "@remirror/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AiOutlineClear } from "react-icons/ai";
import { MdFormatColorText } from "react-icons/md";

import { IconButton, Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

export default function TextColorPicker(): JSX.Element {
  const [edit, setEdit] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000");
  const commands = useCommands();

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e: any) => {
      e.preventDefault();
    },
    []
  );

  const handleChange = useCallback(
    (e: any) => {
      e.preventDefault();
      setColor(e.target.value);
      commands.setTextColor(color);
    },
    [commands.setTextColor, color]
  );

  const closeMenu = (): void => {
    setEdit(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  return (
    <Stack direction="row" ref={ref}>
      {edit && (
        <div
          style={{
            position: "absolute",
            top: "29px",
            width: "100px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "4px",
            padding: "5px",
            zIndex: 2,
          }}
        >
          <input
            type="color"
            id="favcolor"
            name="favcolor"
            value={color}
            onChange={handleChange}
          />
          <IconButton
            sx={{ p: "10px" }}
            onClick={() => {
              commands.removeTextColor();
              setEdit(!edit);
            }}
          >
            <AiOutlineClear size={20} />
          </IconButton>
        </div>
      )}
      <ToggleButton
        value="left"
        key="left"
        size="small"
        onMouseDown={handleMouseDown}
        onClick={() => {
          setEdit(!edit);
        }}
      >
        <MdFormatColorText size={13} />
      </ToggleButton>
    </Stack>
  );
}
