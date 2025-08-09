import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontInstrumentalSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],

  variable: "--font-instrumental-serif",
});

export const metadata: Metadata = {
  title: "Cubix Technology",
  description: "Technical Task for Front-End Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          fontInstrumentalSerif.variable,
          "font-sans",
          "antialiased",
          "scrollbar-hidden"
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
