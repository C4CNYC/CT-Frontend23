import React from "react";

interface Props {
  code: string;
}

export default function BrowserTab({ code }: Props): React.ReactElement {
  return (
    <iframe
      style={{
        border: 0,
        width: "100%",
        height: "100%",
      }}
      src={"data:text/html," + encodeURIComponent(code)}
    />
  );
}
