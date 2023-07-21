import type { Meta } from "@storybook/react";

import { Table } from "@mui/material";

import { voidFunction } from "@utils";

import { TableHeadCustom, TableHeadCustomProps } from "./TableHeadCustom";

const Component: Meta<typeof TableHeadCustom> = {
  component: TableHeadCustom,
  title: "Table/TableHeadCustom",
};

export default Component;

const ExampleComponent = (props: TableHeadCustomProps) => {
  return (
    <Table size={"medium"} sx={{ minWidth: 800 }}>
      <TableHeadCustom {...props} />
    </Table>
  );
};

export const Default = {
  render: (args: TableHeadCustomProps) => <ExampleComponent {...args} />,
  args: {
    order: "asc",
    orderBy: "email",
    headLabel: [
      {
        id: "email",
        label: `email`,
        align: "left",
      },
      {
        id: "first_name",
        label: `first_name`,
        align: "left",
      },
      {
        id: "last_name",
        label: "last_name",
        align: "left",
      },
      {
        id: "role",
        label: "role",
        align: "left",
      },
      {
        id: "isVerified",
        label: "isVerified",
        align: "center",
      },
      {
        id: "status",
        label: "status",
        align: "left",
      },
    ],
    rowCount: 10,
    numSelected: 5,
    onSort: voidFunction,
    onSelectAllRows: voidFunction,
    sx: {},
  },
};
