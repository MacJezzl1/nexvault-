import { setThemeAction } from "@/app/preferences/actions";
import type { ThemeMode } from "@/lib/theme";

type Props = {
  theme: ThemeMode;
  returnTo?: string;
};

export function ThemeToggle({ theme, returnTo = "/settings" }: Props) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <form action={setThemeAction}>
      <input type="hidden" name="theme" value={nextTheme} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm text-sand dark:bg-sand dark:text-ink">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </form>
  );
}
