import { type FC, useState, useEffect, useRef } from "react";

import SkeletonViewBlock from "../skeleton-view-box";

export interface CodeDocument {
  htmlBody?: string[],
  cssBody?: string[],
  jsBody?: string[]
}

interface IBrowserView {
  document: CodeDocument | null
}

const getBody = (bodyList: string[] | undefined, tagName: string): string => 
  bodyList?.reduce((res: string, body: string) => `
    ${res}

    <${tagName}>
      ${body}
    </${tagName}>
  `, '') ?? '';


const BrowserView: FC<IBrowserView> = ({ document }) => {
  const [docSrc, setDocSrc] = useState('');

  useEffect(() => {
    if (document == null) {
      return;
    }

    const { htmlBody = [], cssBody = [], jsBody = [] } = document;

    setDocSrc(`
      <html>
        <head>
          ${getBody(cssBody, 'style')}
        </head>
        <body>
          ${htmlBody.join('\n')}
          ${getBody(jsBody, 'script')}
        </body>
      </html>
    `)
  }, [document])

  if (!document) {
    return (
      <SkeletonViewBlock />
    );
  }

  return (
    <iframe srcDoc={docSrc} style={IFRAME_STYLE} />
  )
};

const IFRAME_STYLE = {
  border: 0,
  width: "100%",
  height: "100%",
}

export default BrowserView;
