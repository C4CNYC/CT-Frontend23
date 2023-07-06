import type { Meta } from "@storybook/react";
import SettingsDrawer from "./SettingsDrawer";
import { ThemeProvider } from "@theme/index";

const Component: Meta<typeof SettingsDrawer> = {
  component: SettingsDrawer,
  title: "Settings/SettingsDrawer",
};

export default Component;

export const Default: Meta<typeof SettingsDrawer> = {
  render: () => <ThemeProvider><SettingsDrawer /></ThemeProvider>,
  args: {},
};
