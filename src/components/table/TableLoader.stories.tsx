import type { Meta } from "@storybook/react";

import { TableLoader } from "./TableLoader";

const Component: Meta<typeof TableLoader> = {
  component: TableLoader,
  title: "Table/TableLoader",
};

export default Component;

export const Default = {
  args: {
    isLoading: true,
  },
};
