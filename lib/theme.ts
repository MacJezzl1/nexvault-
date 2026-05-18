import { cookies } from "next/headers";

export type ThemeMode = "light" | "dark";

export const themeCookieName = "nexvault_theme";

export function normalizeTheme(value?: string | null): ThemeMode {
  return value === "dark" ? "dark" : "light";
}

export function getThemeFromCookies() {
  return normalizeTheme(cookies().get(themeCookieName)?.value);
}
