import type { Meta } from "@storybook/react";
import { LoaderDeleyContent } from "./LoaderDeleyContent";

const Component: Meta<typeof LoaderDeleyContent> = {
  component: LoaderDeleyContent,
  title: "LLoaderDeleyContentogo/LoaderDeleyContent",
};

export default Component;

export const Default = {
  args: {
    deley: 20,
    isFetching: true,
  },
};
