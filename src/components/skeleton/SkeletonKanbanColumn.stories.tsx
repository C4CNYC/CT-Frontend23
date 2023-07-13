import type { Meta } from "@storybook/react";

import { SkeletonKanbanColumn } from "./SkeletonKanbanColumn";

const Component: Meta<typeof SkeletonKanbanColumn> = {
  component: SkeletonKanbanColumn,
  title: "Skeleton/SkeletonKanbanColumn",
};

export default Component;

export const Default: Meta<typeof SkeletonKanbanColumn> = {
  args: {},
};
