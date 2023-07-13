import type { Meta } from "@storybook/react";

import { SearchNotFound } from "./SearchNotFound";

const Component: Meta<typeof SearchNotFound> = {
  component: SearchNotFound,
  title: "SearchNotFound",
};

export default Component;

export const Default = {
  args: {
    query: "query",
    sx: {
      padding: "10px 0",
    },
    variant: "outlined",
  },
};
