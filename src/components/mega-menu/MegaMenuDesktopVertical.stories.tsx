import type { Meta } from "@storybook/react";
import { ThemeProvider } from "@theme/index";

import { Iconify } from "../iconify";
import { MegaMenuDesktopVertical } from "./MegaMenuDesktopVertical";

const Component: Meta<typeof MegaMenuDesktopVertical> = {
  component: MegaMenuDesktopVertical,
  title: "MegaMenu/MegaMenuDesktopVertical",
};

export default Component;

export const Default: Meta<typeof MegaMenuDesktopVertical> = {
  render: (args) => (
    <ThemeProvider>
      <MegaMenuDesktopVertical {...args} />
    </ThemeProvider>
  ),
  args: {
    data: [
      {
        title: "Title",
        path: "path",
        icon: <Iconify icon="ic:round-account-box" />,
        more: {
          title: "More title",
          path: "more-path",
        },
        products: [
          {
            name: "Product Name",
            image: "image",
            path: "product path",
          },
          {
            name: "Product Name",
            image: "image",
            path: "product path",
          },
        ],
        tags: [
          {
            name: "Tag name",
            path: "path",
          },
          {
            name: "Tag name",
            path: "path",
          },
        ],
        children: [
          {
            subheader: "subheader",
            items: [
              {
                title: "Tag title",
                path: "path",
              },
              {
                title: "Tag title",
                path: "path",
              },
            ],
          },
        ],
      },
    ],
  },
};
