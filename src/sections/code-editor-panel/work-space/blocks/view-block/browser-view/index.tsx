import { type FC, useEffect, useState } from "react";

import SkeletonViewBlock from "../skeleton-view-box";

export interface CodeDocument {
  htmlBody?: string[];
  cssBody?: string[];
  jsBody?: string[];
}

interface BrowserViewProps {
  document: CodeDocument | null;
  isOpenHeader?: boolean;
}

enum TagNames {
  Style = "style",
  Script = "script",
}

const getBody = (bodyList: string[], tagName: TagNames): string =>
  bodyList.reduce(
    (res: string, body: string) => `
    ${res}

    <${tagName}>
      ${body}
    </${tagName}>
  `,
    ""
  );

const BrowserView: FC<BrowserViewProps> = ({ document, isOpenHeader }) => {
  const [docSrc, setDocSrc] = useState("");

  useEffect(() => {
    if (document == null) {
      return;
    }

    const { htmlBody = [], cssBody = [], jsBody = [] } = document;

    setDocSrc(`
      <html>
        <head>
          ${getBody(cssBody, TagNames.Style)}
        </head>
        <body>
          ${htmlBody.join("\n")}
          ${getBody(jsBody, TagNames.Script)}
        </body>
      </html>
    `);
  }, [document]);

  return document != null ? (
    <iframe srcDoc={docSrc} style={IFRAME_STYLE} />
  ) : (
    <SkeletonViewBlock isOpenHeader={isOpenHeader} />
  );
};

const IFRAME_STYLE = {
  border: 0,
  width: "100%",
  height: "100%",
};

export default BrowserView;
