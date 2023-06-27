import type { Meta } from "@storybook/react";
import { LoadingScreen } from "./LoadingScreen";

const Component: Meta<typeof LoadingScreen> = {
  component: LoadingScreen,
  title: "LoadingScreen/LoadingScreen",
};

export default Component;

export const Default: Meta<typeof LoadingScreen> = {
  args: {},
};
