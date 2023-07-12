import type { Meta } from "@storybook/react";
import { ThemeProvider } from "@theme/index";

import CustomTextField from "./CustomTextField";

const Component: Meta<typeof CustomTextField> = {
  component: CustomTextField,
  title: "CustomInput/CustomTextField",
};

export default Component;

export const Default: Meta<typeof CustomTextField> = {
  render: (args) => (
    <ThemeProvider>
      <CustomTextField {...args} />
    </ThemeProvider>
  ),
  args: {
    variant: "outlined",
    margin: "normal",
    focused: false,
    hiddenLabel: false,
    placeholder: "CustomTextField",
  },
};
