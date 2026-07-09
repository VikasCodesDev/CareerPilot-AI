export type ResolvedThemeMode = "dark" | "light";

export type ThemeMode = ResolvedThemeMode | "system";

export type ThemeModeConfig = Readonly<{
  defaultTheme: ThemeMode;
  storageKey: string;
  themes: readonly ResolvedThemeMode[];
}>;
