import type {
  ResolvedThemeMode,
  ThemeMode,
  ThemeModeConfig,
} from "@/types/theme";

export const THEME_STORAGE_KEY = "careerpilot-theme";

export const RESOLVED_THEME_MODES = [
  "dark",
  "light",
] as const satisfies readonly ResolvedThemeMode[];

export const THEME_MODES = [
  "dark",
  "light",
  "system",
] as const satisfies readonly ThemeMode[];

export const DEFAULT_THEME_MODE = "dark" satisfies ThemeMode;

export const THEME_ATTRIBUTE = "class";

export const THEME_CLASS_VALUES = {
  dark: "dark",
  light: "light",
} as const satisfies Record<ResolvedThemeMode, ResolvedThemeMode>;

export const themeConfig = {
  defaultTheme: DEFAULT_THEME_MODE,
  storageKey: THEME_STORAGE_KEY,
  themes: RESOLVED_THEME_MODES,
} as const satisfies ThemeModeConfig;

export function isResolvedThemeMode(value: unknown): value is ResolvedThemeMode {
  return value === "dark" || value === "light";
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "dark" || value === "light" || value === "system";
}

export function resolveThemeMode(
  theme: ThemeMode | undefined,
  resolvedTheme: string | undefined,
  fallback: ResolvedThemeMode = "dark"
): ResolvedThemeMode {
  if (theme === "system") {
    return isResolvedThemeMode(resolvedTheme) ? resolvedTheme : fallback;
  }

  return isResolvedThemeMode(theme) ? theme : fallback;
}

export function getNextThemeMode(
  currentTheme: ThemeMode | undefined,
  themeOrder: readonly ThemeMode[] = THEME_MODES
): ThemeMode {
  const safeTheme = isThemeMode(currentTheme) ? currentTheme : DEFAULT_THEME_MODE;
  const currentIndex = themeOrder.indexOf(safeTheme);
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % themeOrder.length : 0;

  return themeOrder[nextIndex] ?? DEFAULT_THEME_MODE;
}
