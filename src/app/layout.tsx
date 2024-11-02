import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { ReactQueryClientProvider } from "@/components/custom/ReactQueryClientProvider";
import { Toaster } from "sonner";
import { FileUploaderProvider } from "@/components/custom/FileUploaderContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MiYamage Gallery",
  description: "Simple Image management library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <FileUploaderProvider>
            <Navbar />
            <Toaster
              toastOptions={{
                classNames: {
                  error: 'bg-red-400',
                  success: 'bg-green-400',
                  warning: 'bg-yellow-400',
                },
              }}
            />
            {children}
          </FileUploaderProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}