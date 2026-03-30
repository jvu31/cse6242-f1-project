import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DriversProvider } from "./contexts/driversContext";
import { FeaturesProvider } from "./contexts/featuresContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Podiumn Predictor",
  description: "Simulate and predict F1 podium finishes based on various factors such as driver performance, track conditions, and historical data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FeaturesProvider>
          <DriversProvider>
            {children}
          </DriversProvider>
        </FeaturesProvider>
      </body>
    </html>
  );
}
