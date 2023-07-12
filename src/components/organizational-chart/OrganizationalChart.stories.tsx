import type { Meta } from "@storybook/react";

import { OrganizationalChart } from "./OrganizationalChart";

const Component: Meta<typeof OrganizationalChart> = {
  component: OrganizationalChart,
  title: "OrganizationalChart",
};

export default Component;

export const Default = {
  args: {
    data: {
      name: "name",
      children: [
        {
          name: "Children name 1",
          group: "Group name 1",
          children: [
            {
              name: "SubChildren name 1",
              group: "Subgroup name 1",
            },
            {
              name: "SubChildren name 2",
              group: "Subgroup name 1",
            },
          ],
        },
        {
          name: "Children name 2",
          group: "Group name 1",
        },
      ],
    },
  },
};
