import type { Meta } from "@storybook/react";

import { voidFunction } from "@utils";

import { TablePaginationCustom } from "./TablePaginationCustom";

const Component: Meta<typeof TablePaginationCustom> = {
  component: TablePaginationCustom,
  title: "Table/TablePaginationCustom",
};

export default Component;

export const Default = {
  args: {
    dense: false,
    onChangeDense: voidFunction,
    rowsPerPageOptions: [5, 10, 15],
    count: 50,
    page: 5,
    rowsPerPage: 5,
    showFirstButton: true,
    showLastButton: true,
  },
};
