import type { Meta } from "@storybook/react";

import { SkeletonConversationItem } from "./SkeletonConversationItem";

const Component: Meta<typeof SkeletonConversationItem> = {
  component: SkeletonConversationItem,
  title: "Skeleton/SkeletonConversationItem",
};

export default Component;

export const Default: Meta<typeof SkeletonConversationItem> = {
  args: {},
};
