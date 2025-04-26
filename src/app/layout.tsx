import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/store";
import { ModelLoaderWrapper } from "@/components/ModelLoaderWrapper";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Voicera - Facial Recognition Dashboard",
  description: "Advanced facial recognition and analysis system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${outfit.variable} antialiased`}>
        <Providers>
          <ModelLoaderWrapper>{children}</ModelLoaderWrapper>
        </Providers>
      </body>
    </html>
  );
}
