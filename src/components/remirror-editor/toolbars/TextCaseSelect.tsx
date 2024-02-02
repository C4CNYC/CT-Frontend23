import React from "react";

import {
  CommandButtonGroup,
  CommandMenuItem,
  DropdownButton,
  useActive,
  useCommands,
} from "@remirror/react";
import "remirror/styles/all.css";

const TEXT_CASES: Array<[React.CSSProperties["textTransform"], string]> = [
  ["none", "None"],
  ["uppercase", "Upper"],
  ["lowercase", "Lower"],
  ["capitalize", "Capitalize"],
];

export default function TextCaseSelect() {
  const { setTextCase } = useCommands();
  const { textCase } = useActive();
  return (
    <CommandButtonGroup>
      <DropdownButton aria-label="Text case" icon="fontSize2">
        {TEXT_CASES.map(([casing, label]) => (
          <CommandMenuItem
            key={casing}
            commandName="setTextCase"
            onSelect={() => {
              setTextCase(casing as string);
            }}
            enabled={setTextCase.enabled(casing as string)}
            active={textCase({ casing })}
            label={<span style={{ textTransform: casing }}>{label}</span>}
          />
        ))}
        <CommandMenuItem
          commandName="setTextCase"
          onSelect={() => {
            setTextCase("small-caps");
          }}
          enabled={setTextCase.enabled("small-caps")}
          active={textCase({ casing: "small-caps" })}
          label={<span style={{ fontVariant: "small-caps" }}>Small caps</span>}
        />
      </DropdownButton>
    </CommandButtonGroup>
  );
}
