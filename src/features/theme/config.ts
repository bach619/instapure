// Warna utama untuk tema terang
export const lightTheme = {
  primary: "#3B82F6",
  primaryDark: "#2563EB",
  secondary: "#10B981",
  background: "#FFFFFF",
  foreground: "#1F2937",
  card: "#F9FAFB",
  cardForeground: "#111827",
  popover: "#FFFFFF",
  popoverForeground: "#1F2937",
  muted: "#F3F4F6",
  mutedForeground: "#6B7280",
  accent: "#F3F4F6",
  accentForeground: "#111827",
  destructive: "#EF4444",
  destructiveForeground: "#F9FAFB",
  border: "#E5E7EB",
  input: "#E5E7EB",
  ring: "#3B82F6",
};

// Warna utama untuk tema gelap
export const darkTheme = {
  primary: "#60A5FA",
  primaryDark: "#3B82F6",
  secondary: "#34D399",
  background: "#111827",
  foreground: "#F9FAFB",
  card: "#1F2937",
  cardForeground: "#F9FAFB",
  popover: "#1F2937",
  popoverForeground: "#F9FAFB",
  muted: "#374151",
  mutedForeground: "#9CA3AF",
  accent: "#374151",
  accentForeground: "#F9FAFB",
  destructive: "#7F1D1D",
  destructiveForeground: "#F9FAFB",
  border: "#374151",
  input: "#374151",
  ring: "#60A5FA",
};

// Konfigurasi tema utama
export const themeConfig = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export const themes = {
  DARK: "dark",
  LIGHT: "light",
} as const;

export const DEFAULT_THEME = themes.LIGHT;
export const themesList = [themes.DARK, themes.LIGHT] as const;
