import React, { MouseEventHandler, useCallback, useState } from "react";

import { useCommands } from "@remirror/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AiFillCheckCircle } from "react-icons/ai";
import { GoBrowser } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import "remirror/styles/all.css";

import { IconButton, Stack, TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";

export default function AddIframeButton(): JSX.Element {
  const { addIframe } = useCommands();
  const [href, setHref] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);

  const handleChange = useCallback((e: any) => {
    setHref(e.target.value);
  }, []);

  const closeMenu = (): void => {
    setEdit(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (e: any) => {
    e.preventDefault();
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    addIframe({ src: href, height: 250, width: 500 });
    setHref("");
    setEdit(!edit);
  };

  return (
    <Stack direction="row" style={{ marginLeft: "10px" }} ref={ref}>
      {edit && (
        <div
          style={{
            position: "absolute",
            top: "44px",
            width: "280px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "4px",
            padding: "5px",
            zIndex: 2,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            type="url"
            placeholder="Enter link..."
            value={href}
            onChange={handleChange}
            required
          />
          <IconButton sx={{ p: "10px" }} onClick={handleSubmit}>
            <AiFillCheckCircle size={22} color="green" />
          </IconButton>

          <IconButton
            sx={{ p: "10px" }}
            onClick={() => {
              setEdit(!edit);
            }}
          >
            <RxCrossCircled size={22} color="red" />
          </IconButton>
        </div>
      )}
      <ToggleButton
        value="left"
        key="left"
        onMouseDown={handleMouseDown}
        onClick={() => {
          setEdit(!edit);
        }}
      >
        <GoBrowser size={22} />
      </ToggleButton>
    </Stack>
  );
}
