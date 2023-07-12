import type { Meta } from "@storybook/react";

import { CodeEditor } from "./editor";

const Component: Meta<typeof CodeEditor> = {
  component: CodeEditor,
  title: "RealTimeEditor/CodeEditor",
};

export default Component;

export const Default = {
  args: {
    cursorId: "1",
    cursorText: "cursor text",
    preloadedCode: "<h1> Some preloaded code</h1>",
    state: {
      connected: false,
    },
  },
};
