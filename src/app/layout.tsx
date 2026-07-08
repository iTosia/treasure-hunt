import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Treasure Hunt",
  description: "Find the hidden treasure on the map!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
