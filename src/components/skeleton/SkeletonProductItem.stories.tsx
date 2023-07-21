import type { Meta } from "@storybook/react";

import { SkeletonProductItem } from "./SkeletonProductItem";

const Component: Meta<typeof SkeletonProductItem> = {
  component: SkeletonProductItem,
  title: "Skeleton/SkeletonProductItem",
};

export default Component;

export const Default: Meta<typeof SkeletonProductItem> = {
  args: {},
};
