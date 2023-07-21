import type { Meta } from "@storybook/react";

import { SkeletonPostItem } from "./SkeletonPostItem";

const Component: Meta<typeof SkeletonPostItem> = {
  component: SkeletonPostItem,
  title: "Skeleton/SkeletonPostItem",
};

export default Component;

export const Default: Meta<typeof SkeletonPostItem> = {
  args: {},
};
