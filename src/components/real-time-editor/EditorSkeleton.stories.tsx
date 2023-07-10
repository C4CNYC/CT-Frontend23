import type { Meta } from "@storybook/react";

import EditorSkeleton from "./EditorSkeleton";

const Component: Meta<typeof EditorSkeleton> = {
  component: EditorSkeleton,
  title: "RealTimeEditor/EditorSkeleton",
};

export default Component;

export const Default = {
  args: {},
};
