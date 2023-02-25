import React, { ChangeEventHandler, MouseEventHandler, useCallback, useState } from "react";
import { useCommands } from "@remirror/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { IconButton, Stack } from "@mui/material";
import { AiOutlineClear } from "react-icons/ai";
import { MdFormatColorText } from "react-icons/md";
import ToggleButton from "@mui/material/ToggleButton";

export default function TextColorPicker(): JSX.Element {
  const [edit, setEdit] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000");
  const commands = useCommands();

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    e.preventDefault();
    setColor(e.target.value);
    commands.setTextColor(color);
  }, [commands.setTextColor, color]);

  const closeMenu = () => {
    setEdit(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  return (
    <Stack direction="row" style={{ position: "relative", marginLeft: "10px" }} ref={ref}>
      {edit &&
        <div style={{
          position: "absolute",
          top: "29px",
          width: "100px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: "4px",
          padding: "5px",
          zIndex: 2
        }}>
          <input type="color" id="favcolor" name="favcolor" value={color} onChange={handleChange} />
          <IconButton
            sx={{ p: "10px", ml: 1 }}
            onClick={() => {
              commands.removeTextColor();
              setEdit(!edit);
            }}
          >
            <AiOutlineClear size={20} />
          </IconButton>
        </div>
      }
      <ToggleButton
        value="left"
        key="left"
        onMouseDown={handleMouseDown}
        onClick={() => {
          setEdit(!edit);
        }}
      >
        <MdFormatColorText size={22} />
      </ToggleButton>
    </Stack>
  );
};
