import type { Meta } from "@storybook/react";
import { ThemeProvider } from "@theme/index";

import SettingsDrawer from "./SettingsDrawer";

const Component: Meta<typeof SettingsDrawer> = {
  component: SettingsDrawer,
  title: "Settings/SettingsDrawer",
};

export default Component;

export const Default: Meta<typeof SettingsDrawer> = {
  render: () => (
    <ThemeProvider>
      <SettingsDrawer />
    </ThemeProvider>
  ),
  args: {},
};
