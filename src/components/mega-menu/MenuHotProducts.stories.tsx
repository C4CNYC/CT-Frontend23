import type { Meta } from "@storybook/react";
import { ThemeProvider } from "@theme/index";

import { MenuHotProducts } from "./MenuHotProducts";

const Component: Meta<typeof MenuHotProducts> = {
  component: MenuHotProducts,
  title: "MegaMenu/MenuHotProducts",
};

export default Component;

export const Default: Meta<typeof MenuHotProducts> = {
  render: (args) => (
    <ThemeProvider>
      <MenuHotProducts {...args} />
    </ThemeProvider>
  ),
  args: {
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
  },
};
