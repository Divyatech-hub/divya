import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divyalakshmi V.P. | Neon Fusion Portfolio",
  description: "Software Engineer, AI Researcher, Community Leader. Building the future with high-tech precision and artistic expression.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
