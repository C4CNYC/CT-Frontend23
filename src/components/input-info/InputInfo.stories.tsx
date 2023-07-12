import type { Meta } from "@storybook/react";

import { InputInfo } from "./InputInfo";

const Component: Meta<typeof InputInfo> = {
  component: InputInfo,
  title: "InputInfo",
};

export default Component;

export const Default = {
  args: {
    text: "example text",
  },
};
