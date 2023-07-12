import type { Meta } from "@storybook/react";
import { ThemeProvider } from "@theme/index";

import CustomSmallSelect from "./CustomSmallSelect";

const Component: Meta<typeof CustomSmallSelect> = {
  component: CustomSmallSelect,
  title: "CustomInput/CustomSmallSelect",
};

export default Component;

export const Default: Meta<typeof CustomSmallSelect> = {
  render: (args) => (
    <ThemeProvider>
      <CustomSmallSelect {...args} />
    </ThemeProvider>
  ),
  args: {
    margin: "normal",
    hiddenLabel: false,
    focused: false,
    children: (
      <>
        <option value="first value">First value</option>
        <option value="second value">Second value</option>
        <option value="thirs value">Third value</option>
        <option value="fourth value">Fourth value</option>
        <option value="fifth value">Fifth value</option>
      </>
    ),
  },
};
