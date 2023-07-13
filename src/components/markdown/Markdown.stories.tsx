import type { Meta } from "@storybook/react";

import { Markdown } from "./Markdown";

const Component: Meta<typeof Markdown> = {
  component: Markdown,
  title: "Markdown",
};

export default Component;

export const Default: Meta<typeof Markdown> = {
  args: {
    children: "<h1>some text</h1> <h6>some subtext</h6>",
    unwrapDisallowed: false,
    sourcePos: false,
    rawSourcePos: false,
    skipHtml: false,
    includeElementIndex: false,
  },
};
