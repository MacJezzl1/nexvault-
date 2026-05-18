import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXVAULT",
  description: "Private AI memory infrastructure."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
