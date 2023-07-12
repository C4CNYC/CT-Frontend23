import type { Meta } from "@storybook/react";

import { Scrollbar } from "./Scrollbar";

const Component: Meta<typeof Scrollbar> = {
  component: Scrollbar,
  title: "Scrollbar",
};

export default Component;

export const Default = {
  args: {
    children: (
      <h1>
        Some content for scroll bar element Some content for scroll bar element
      </h1>
    ),
    sx: {
      width: 200,
      "& h1": {
        width: 400,
      },
    },
  },
};
