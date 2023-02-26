import "remirror/styles/all.css";

import { IconButton, Stack, TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import { useCommands } from "@remirror/react";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AiFillCheckCircle, AiFillYoutube } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

export default function AddIframeButton(): JSX.Element {
  const { addYouTubeVideo } = useCommands();
  const [href, setHref] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setHref(e.target.value);
    },
    []
  );

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
    },
    []
  );

  const handleSubmit: MouseEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      addYouTubeVideo({ video: href, showControls: true });
      setHref("");
      setEdit(!edit);
    },
    [addYouTubeVideo, href]
  );

  const closeMenu = () => {
    setEdit(false);
  };
  const ref = useDetectClickOutside({ onTriggered: closeMenu });

  return (
    <Stack
      direction="row"
      style={{ marginLeft: "10px" }}
      ref={ref}
    >
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
            placeholder="Enter youtube link..."
            value={href}
            onChange={handleChange}
            required
          />
          <IconButton
            sx={{ p: "10px" }}
            onClick={handleSubmit}
            disabled={!href}
          >
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
        <AiFillYoutube size={22} />
      </ToggleButton>
    </Stack>
  );
}
