import type { Meta } from "@storybook/react";

import { TableSkeleton } from "./TableSkeleton";

const Component: Meta<typeof TableSkeleton> = {
  component: TableSkeleton,
  title: "Table/TableSkeleton",
};

export default Component;

export const Default = {
  args: {
    sx: {
      width: "100%",
    },
  },
};
