import type { Metadata } from "next";
import { getThemeFromCookies } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXVAULT",
  description: "Private AI memory infrastructure."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const theme = getThemeFromCookies();

  return (
    <html lang="en" className={theme}>
      <body>{children}</body>
    </html>
  );
}
