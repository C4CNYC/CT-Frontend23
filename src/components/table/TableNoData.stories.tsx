import type { Meta } from "@storybook/react";

import { TableNoData } from "./TableNoData";

const Component: Meta<typeof TableNoData> = {
  component: TableNoData,
  title: "Table/TableNoData",
};

export default Component;

export const Default = {
  args: {
    isNotFound: true,
  },
};
