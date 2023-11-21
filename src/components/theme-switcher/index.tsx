import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

import { IconButton } from "@mui/material";

import { useSettingsContext } from "../settings";

enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

const ThemeSwitcher = (): React.ReactElement => {
  const { themeMode, onToggleMode } = useSettingsContext();

  return (
    <IconButton onClick={onToggleMode}>
      {themeMode !== ThemeMode.LIGHT ? (
        <MdOutlineLightMode />
      ) : (
        <MdOutlineDarkMode />
      )}
    </IconButton>
  );
};

export default ThemeSwitcher;
