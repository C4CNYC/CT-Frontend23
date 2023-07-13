import type { Meta } from "@storybook/react";

import { EmptyContent } from "./EmptyContent";

const Component: Meta<typeof EmptyContent> = {
  component: EmptyContent,
  title: "EmptyContent",
};

export default Component;

export const Default = {
  args: {
    title: "Empty content",
    description: "emty content component with default image",
  },
};
