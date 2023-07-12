import ThemeColorPresets from "./ThemeColorPresets";
import ThemeContrast from "./ThemeContrast";
import ThemeRtlLayout from "./ThemeRtlLayout";
import SettingsDrawer from "./drawer";

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

export function ThemeSettings({ children }: Props): React.ReactElement | null {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeRtlLayout>
          {children}
          <SettingsDrawer />
        </ThemeRtlLayout>
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
