import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aktualności z Polski – Najnowsze informacje",
  description: "Bądź na bieżąco z 6 najważniejszymi wiadomościami z Polski dzięki AI.",
  keywords: [
    "wiadomości Polska",
    "aktualności polskie"
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
