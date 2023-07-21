import * as React from "react";

import InfoIcon from "@mui/icons-material/Info";

interface InputInfoProps {
  text: string;
}

export function InputInfo({ text }: InputInfoProps): React.ReactElement | null {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "14px",
        color: "#04297A",
      }}
    >
      <InfoIcon sx={{ color: "#1554F6", mr: 1 }} />
      {text}
    </div>
  );
}
