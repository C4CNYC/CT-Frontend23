import type { Meta } from "@storybook/react";

import { SkeletonCoursesItem } from "./SkeletonCoursesItem";

const Component: Meta<typeof SkeletonCoursesItem> = {
  component: SkeletonCoursesItem,
  title: "Skeleton/SkeletonCoursesItem",
};

export default Component;

export const Default: Meta<typeof SkeletonCoursesItem> = {
  args: {},
};
