import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Board Assessment",
  description: "Single page to-do board with dark and light mode + 3D widget"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
