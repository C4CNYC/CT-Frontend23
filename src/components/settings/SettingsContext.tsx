import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// utils
import { localStorageAvailable, voidFunction } from "@utils";

//
import { defaultSettings } from "./config-setting";
import { defaultPreset, getPresets, presetsOption } from "./presets";
import {
  SettingsContextProps,
  ThemeColorPresetsValue,
  ThemeContrastValue,
  ThemeDirectionValue,
  ThemeLayoutValue,
  ThemeModeValue,
  ThemeStretchValue,
} from "./types";

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Mode
  onToggleMode: voidFunction,
  onChangeMode: voidFunction,
  // Direction
  onToggleDirection: voidFunction,
  onChangeDirection: voidFunction,
  onChangeDirectionByLang: voidFunction,
  // Layout
  onToggleLayout: voidFunction,
  onChangeLayout: voidFunction,
  // Contrast
  onToggleContrast: voidFunction,
  onChangeContrast: voidFunction,
  // Color
  onChangeColorPresets: voidFunction,
  presetsColor: defaultPreset,
  presetsOption: [],
  // Stretch
  onToggleStretch: voidFunction,
  // Reset
  onResetSetting: voidFunction,
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

export const useSettingsContext = (): SettingsContextProps => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettingsContext must be use inside SettingsProvider");
  }

  return context;
};

// ----------------------------------------------------------------------

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function SettingsProvider({
  children,
}: SettingsProviderProps): React.ReactElement | null {
  const [themeMode, setThemeMode] = useState(defaultSettings.themeMode);
  const [themeLayout, setThemeLayout] = useState(defaultSettings.themeLayout);
  const [themeStretch, setThemeStretch] = useState(
    defaultSettings.themeStretch
  );
  const [themeContrast, setThemeContrast] = useState(
    defaultSettings.themeContrast
  );
  const [themeDirection, setThemeDirection] = useState(
    defaultSettings.themeDirection
  );
  const [themeColorPresets, setThemeColorPresets] = useState(
    defaultSettings.themeColorPresets
  );

  const storageAvailable = localStorageAvailable();

  const langStorage = storageAvailable
    ? localStorage.getItem("i18nextLng")
    : "";

  const isArabic = langStorage === "ar";

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang("ar");
    }
  }, [isArabic]);

  useEffect(() => {
    if (storageAvailable) {
      const mode = getCookie("themeMode") ?? defaultSettings.themeMode;
      const layout = getCookie("themeLayout") ?? defaultSettings.themeLayout;
      const stretch = getCookie("themeStretch") ?? defaultSettings.themeStretch;
      const contrast =
        getCookie("themeContrast") ?? defaultSettings.themeContrast;
      const direction =
        getCookie("themeDirection") ?? defaultSettings.themeDirection;
      const colorPresets =
        getCookie("themeColorPresets") ?? defaultSettings.themeColorPresets;

      setThemeMode(mode as ThemeModeValue);
      setThemeLayout(layout as ThemeLayoutValue);
      setThemeStretch(stretch as ThemeStretchValue);
      setThemeContrast(contrast as ThemeContrastValue);
      setThemeDirection(direction as ThemeDirectionValue);
      setThemeColorPresets(colorPresets as ThemeColorPresetsValue);
    }
  }, [storageAvailable]);

  // Mode
  const onToggleMode = useCallback(() => {
    const value = themeMode === "light" ? "dark" : "light";
    setThemeMode(value);
    setCookie("themeMode", value);
  }, [themeMode]);

  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeModeValue;
      setThemeMode(value);
      setCookie("themeMode", value);
    },
    []
  );

  // Direction
  const onToggleDirection = useCallback(() => {
    const value = themeDirection === "rtl" ? "ltr" : "rtl";
    setThemeDirection(value);
    setCookie("themeDirection", value);
  }, [themeDirection]);

  const onChangeDirection = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeDirectionValue;
      setThemeDirection(value);
      setCookie("themeDirection", value);
    },
    []
  );

  const onChangeDirectionByLang = useCallback((lang: string) => {
    const value = lang === "ar" ? "rtl" : "ltr";
    setThemeDirection(value);
    setCookie("themeDirection", value);
  }, []);

  // Layout
  const onToggleLayout = useCallback(() => {
    const value = themeLayout === "vertical" ? "mini" : "vertical";
    setThemeLayout(value);
    setCookie("themeLayout", value);
  }, [themeLayout]);

  const onChangeLayout = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeLayoutValue;
      setThemeLayout(value);
      setCookie("themeLayout", value);
    },
    []
  );

  // Contrast
  const onToggleContrast = useCallback(() => {
    const value = themeContrast === "default" ? "bold" : "default";
    setThemeContrast(value);
    setCookie("themeContrast", value);
  }, [themeContrast]);

  const onChangeContrast = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeContrastValue;
      setThemeContrast(value);
      setCookie("themeContrast", value);
    },
    []
  );

  // Color
  const onChangeColorPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeColorPresetsValue;
      setThemeColorPresets(value);
      setCookie("themeColorPresets", value);
    },
    []
  );

  // Stretch
  const onToggleStretch = useCallback(() => {
    const value = !themeStretch;
    setThemeStretch(value);
    setCookie("themeStretch", JSON.stringify(value));
  }, [themeStretch]);

  // Reset
  const onResetSetting = useCallback(() => {
    setThemeMode(defaultSettings.themeMode);
    setThemeLayout(defaultSettings.themeLayout);
    setThemeStretch(defaultSettings.themeStretch);
    setThemeContrast(defaultSettings.themeContrast);
    setThemeDirection(defaultSettings.themeDirection);
    setThemeColorPresets(defaultSettings.themeColorPresets);
    removeCookie("themeMode");
    removeCookie("themeLayout");
    removeCookie("themeStretch");
    removeCookie("themeContrast");
    removeCookie("themeDirection");
    removeCookie("themeColorPresets");
  }, []);

  const memoizedValue = useMemo(
    () => ({
      // Mode
      themeMode,
      onToggleMode,
      onChangeMode,
      // Direction
      themeDirection,
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Layout
      themeLayout,
      onToggleLayout,
      onChangeLayout,
      // Contrast
      themeContrast,
      onChangeContrast,
      onToggleContrast,
      // Stretch
      themeStretch,
      onToggleStretch,
      // Color
      themeColorPresets,
      onChangeColorPresets,
      presetsOption,
      presetsColor: getPresets(themeColorPresets),
      // Reset
      onResetSetting,
    }),
    [
      // Mode
      themeMode,
      onChangeMode,
      onToggleMode,
      // Color
      themeColorPresets,
      onChangeColorPresets,
      onChangeContrast,
      // Direction
      themeDirection,
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Layout
      themeLayout,
      onToggleLayout,
      onChangeLayout,
      // Contrast
      themeContrast,
      onToggleContrast,
      // Stretch
      themeStretch,
      onToggleStretch,
      // Reset
      onResetSetting,
    ]
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}

// ----------------------------------------------------------------------

function getCookie(name: string): undefined | string {
  if (typeof document === "undefined") {
    throw new Error(
      "getCookie() is not supported on the server. Fallback to a different value when rendering on the server."
    );
  }

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts[1].split(";").shift();
  }

  return undefined;
}

function setCookie(name: string, value: string, exdays = 3): void {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function removeCookie(name: string): void {
  document.cookie = `${name}=;path=/;max-age=0`;
}
