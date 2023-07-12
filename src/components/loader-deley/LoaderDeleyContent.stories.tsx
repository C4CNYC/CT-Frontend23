import type { Meta } from "@storybook/react";

import { LoaderDeleyContent } from "./LoaderDeleyContent";

const Component: Meta<typeof LoaderDeleyContent> = {
  component: LoaderDeleyContent,
  title: "LoaderDeleyContent",
};

export default Component;

export const Default = {
  args: {
    deley: 10000,
    isFetching: true,
  },
};
