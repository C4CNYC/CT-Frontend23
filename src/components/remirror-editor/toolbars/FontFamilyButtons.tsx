import React from "react";

import {
  CommandButtonGroup,
  CommandMenuItem,
  DropdownButton,
  useActive,
  useCommands,
} from "@remirror/react";

const FONT_FAMILIES: Array<[React.CSSProperties["fontFamily"], string]> = [
  ["serif", "Serif"],
  ["sans-serif", "San serif"],
  ["cursive", "Cursive"],
  ["fantasy", "Fantasy"],
];

export default function FontFamilyButtons() {
  const { setFontFamily } = useCommands();
  const active = useActive();
  return (
    <CommandButtonGroup>
      <DropdownButton aria-label="Font family" icon="text">
        {FONT_FAMILIES.map(([fontFamily, label]) => (
          <CommandMenuItem
            key={fontFamily}
            commandName="setFontFamily"
            onSelect={() => {
              setFontFamily(fontFamily as string);
            }}
            enabled={setFontFamily.enabled(fontFamily as string)}
            active={active.fontFamily({ fontFamily })}
            label={<span style={{ fontFamily }}>{label}</span>}
          />
        ))}
      </DropdownButton>
    </CommandButtonGroup>
  );
}
