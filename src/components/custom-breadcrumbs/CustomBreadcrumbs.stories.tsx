import type { Meta } from "@storybook/react";

import { CustomBreadcrumbs } from "./CustomBreadcrumbs";

const Component: Meta<typeof CustomBreadcrumbs> = {
  component: CustomBreadcrumbs,
  title: "CustomBreadcrumbs",
};

export default Component;

export const Default = {
  args: {
    heading: "heading",
    links: [
      { name: "First", href: "#first" },
      { name: "Second", href: "#second" },
    ],
    moreLink: ["first more link", "second more link"],
    activeLast: true,
    action: <>Actions component</>,
    itemsAfterCollapse: 1,
    itemsBeforeCollapse: 2,
    maxItems: 1,
  },
};
