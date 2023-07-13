import type { Meta } from "@storybook/react";

import { SkeletonMailNavItem } from "./SkeletonMailNavItem";

const Component: Meta<typeof SkeletonMailNavItem> = {
  component: SkeletonMailNavItem,
  title: "Skeleton/SkeletonMailNavItem",
};

export default Component;

export const Default: Meta<typeof SkeletonMailNavItem> = {
  args: {},
};
