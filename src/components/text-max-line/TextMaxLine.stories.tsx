import type { Meta } from "@storybook/react";

import { TextMaxLine } from "./index";

const Component: Meta<typeof TextMaxLine> = {
  component: TextMaxLine,
  title: "TextMaxLine",
};

export default Component;

export const Default: Meta<typeof TextMaxLine> = {
  args: {
    asLink: false,
    variant: "body1",
    line: 1,
    persistent: false,
    children:
      "Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor siLorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emetLorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emett emet Lorem ipsum dolor sit emetLorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emetLorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet Lorem ipsum dolor sit emet",
    sx: {
      color: "green",
    },
  },
};
