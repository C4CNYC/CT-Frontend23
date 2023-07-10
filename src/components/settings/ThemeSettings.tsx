import SettingsDrawer from "./drawer";
import ThemeContrast from "./ThemeContrast";
import ThemeRtlLayout from "./ThemeRtlLayout";
import ThemeColorPresets from "./ThemeColorPresets";

interface Props {
  children: React.ReactNode;
}

export function ThemeSettings({
  children,
}: Props): React.ReactElement | null {
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
