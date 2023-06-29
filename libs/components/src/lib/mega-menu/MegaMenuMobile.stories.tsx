import type { Meta } from "@storybook/react";
import { MegaMenuMobile } from "./MegaMenuMobile";
import { Iconify } from "../iconify"
import { ThemeProvider } from "@ct-nx/theme";

const Component: Meta<typeof MegaMenuMobile> = {
  component: MegaMenuMobile,
  title: "MegaMenu/MegaMenuMobile",
};

export default Component;

export const Default: Meta<typeof MegaMenuMobile> = {
  render: (args) => <ThemeProvider><MegaMenuMobile {...args} /></ThemeProvider>,
  args: {
    data: [
      {
        title: "Title",
        path: "path",
        icon: <Iconify icon="ic:round-account-box" />,
        more: {
          title: "More title",
          path: "more-path"
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
          }
        ],
        tags: [
          {
            name: "Tag name",
            path: "path",
          },
          {
            name: "Tag name",
            path: "path",
          }
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
              }
            ]
          }
        ]
      }
    ]
  },
};
