import "remirror/styles/all.css";

import React from "react";
import { useCommands } from "@remirror/react";

export default function AddYoutubeButton() {
  const commands = useCommands();
  const handleClick = () => { commands.addYouTubeVideo({ video: "Zi7sRMcJT-o", startAt: 450 }); };
  return (
    <button onMouseDown={(event) => { event.preventDefault(); }} onClick={handleClick}>
      Add Youtube video
    </button>
  );
};
