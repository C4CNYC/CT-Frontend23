import type { Meta } from "@storybook/react";
import { ThemeProvider } from "@theme/index";

import {
  SnackbarProviderWrapper,
  SnackbarProviderWrapperProps,
} from "./SnackbarProviderWrapper";

const Component: Meta<typeof SnackbarProviderWrapper> = {
  component: SnackbarProviderWrapper,
  title: "SnackbarProviderWrapper",
};

export default Component;

const ExampleComponent = (props: SnackbarProviderWrapperProps) => {
  return (
    <ThemeProvider>
      <SnackbarProviderWrapper {...props} />
    </ThemeProvider>
  );
};

export const Default: Meta<typeof SnackbarProviderWrapper> = {
  render: (args) => <ExampleComponent {...args} />,
  args: {
    children: <>Some children content</>,
  },
};
