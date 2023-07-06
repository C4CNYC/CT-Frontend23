import type { Meta } from "@storybook/react";
import { CustomAvatarGroup } from "./CustomAvatarGroup"
import { CustomAvatar } from "./CustomAvatar"

const Component: Meta<typeof CustomAvatarGroup> = {
  component: CustomAvatarGroup,
  title: "CustomAvatar/CustomAvatarGroup",
};

export default Component;

export const Default = {
  args: {
    size: "small",
    compact: false,
    children: <>
        <CustomAvatar 
            color="primary"
            variant="rounded"
            name="Custom avatar"
        />
        <CustomAvatar 
            color="primary"
            variant="rounded"
            name="Custom avatar"
        />
        <CustomAvatar 
            color="primary"
            variant="rounded"
            name="Custom avatar"
        />
    </>
  },
};

