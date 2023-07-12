import type { Meta } from "@storybook/react";

import { ConfirmDialog } from "./ConfirmDialog";

const Component: Meta<typeof ConfirmDialog> = {
  component: ConfirmDialog,
  title: "ConfirmDialog",
};

export default Component;

export const Default = {
  args: {
    title: "title",
    open: true,
    content: "Content",
    action: "Dialog action",
  },
};
