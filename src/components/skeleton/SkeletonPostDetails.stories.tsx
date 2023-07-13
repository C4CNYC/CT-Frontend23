import type { Meta } from "@storybook/react";

import { SkeletonPostDetails } from "./SkeletonPostDetails";

const Component: Meta<typeof SkeletonPostDetails> = {
  component: SkeletonPostDetails,
  title: "Skeleton/SkeletonPostDetails",
};

export default Component;

export const Default: Meta<typeof SkeletonPostDetails> = {
  args: {},
};
