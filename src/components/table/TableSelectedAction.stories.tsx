import type { Meta } from "@storybook/react";

import { IconButton, Tooltip } from "@mui/material";

import { Iconify } from "../iconify";
import { TableSelectedAction } from "./TableSelectedAction";

const Component: Meta<typeof TableSelectedAction> = {
  component: TableSelectedAction,
  title: "Table/TableSelectedAction",
};

export default Component;

export const Default = {
  args: {
    dense: true,
    action: (
      <Tooltip title="Delete">
        <IconButton color="primary">
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </Tooltip>
    ),
    numSelected: 5,
    rowCount: 10,
    useFlexGap: false,
  },
};
