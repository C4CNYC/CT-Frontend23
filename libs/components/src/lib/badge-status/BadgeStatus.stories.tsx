import type { Meta } from "@storybook/react";
import { BadgeStatus } from "./BadgeStatus";

const Component: Meta<typeof BadgeStatus> = {
  component: BadgeStatus,
  title: "BadgeStatus/BadgeStatus",
};

export default Component;

export const Default = {
  args: {
    size: 'medium',
    status: "online",
    sx: {
        width: 10,
        height: 10
    }
  },
};
