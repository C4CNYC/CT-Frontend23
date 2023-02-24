import SettingsDrawer from "./drawer";
import ThemeColorPresets from "./ThemeColorPresets";
import ThemeContrast from "./ThemeContrast";
import ThemeRtlLayout from "./ThemeRtlLayout";

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

export default function ThemeSettings({
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
