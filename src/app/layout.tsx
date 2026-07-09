import type { Metadata } from "next";
import "./globals.scss";
import { ClerkProvider } from '@clerk/nextjs';

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
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
