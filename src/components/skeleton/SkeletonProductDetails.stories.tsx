import type { Meta } from "@storybook/react";

import { SkeletonProductDetails } from "./SkeletonProductDetails";

const Component: Meta<typeof SkeletonProductDetails> = {
  component: SkeletonProductDetails,
  title: "Skeleton/SkeletonProductDetails",
};

export default Component;

export const Default: Meta<typeof SkeletonProductDetails> = {
  args: {},
};
