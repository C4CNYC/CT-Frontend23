import "remirror/styles/all.css";

import {
  CommandMenuItem,
  DropdownButton,
  useActive,
  useCommands,
} from "@remirror/react";
import React from "react";

const FONT_SIZES = ["8", "10", "12", "14", "16", "18", "24", "30"];

export default function FontSizeButtons() {
  const { setFontSize } = useCommands();
  const { fontSize } = useActive();
  return (
    <DropdownButton aria-label="Set font size" icon="fontSize">
      {FONT_SIZES.map((size) => (
        <CommandMenuItem
          key={size}
          commandName="setFontSize"
          onSelect={() => {
            setFontSize(size);
          }}
          enabled={setFontSize.enabled(size)}
          active={fontSize({ size })}
          label={size}
          icon={null}
          displayDescription={false}
        />
      ))}
    </DropdownButton>
  );
}
