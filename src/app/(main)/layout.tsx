import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/toClientSide/Providers";
import NavigationBar from "@/components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <Providers>
            <NavigationBar />
            {children}
          </Providers>
        </body>
      </html>
    </>
  );
}