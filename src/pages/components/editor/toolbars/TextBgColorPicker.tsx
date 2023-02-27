import { IconButton, Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import { useCommands } from "@remirror/react";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AiOutlineClear, AiOutlineHighlight } from "react-icons/ai";

export default function TextColorPicker(): JSX.Element {
  const [edit, setEdit] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000");
  const commands = useCommands();

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
    },
    []
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();
      setColor(e.target.value);
      commands.setTextHighlight(color);
    },
    [commands.setTextHighlight, color]
  );

  const closeMenu = (): void => {
    setEdit(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  return (
    <Stack
      direction="row"
      ref={ref}
    >
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
        <AiOutlineHighlight size={13} />
      </ToggleButton>
    </Stack>
  );
}
