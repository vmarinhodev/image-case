import { ReactQueryClientProvider } from "@/components/custom/ReactQueryClientProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { Toaster } from "sonner";
import { FileUploaderProvider } from "@/components/custom/FileUploaderContext";
import { supabaseServer } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

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
  title: "VMDev Gallery",
  description: "Simple Image management library",
};

// Define the user type expected by the Navbar
export interface NavbarUser {
  email?: string;
  id: string;
}

// Utility function to transform Supabase User to NavbarUser
function transformUser(user: User | null): NavbarUser | null {
  if (user) {
    return {
      email: user.email || 'No email', // Ensure email is a string, or provide a default
      id: user.id, // Assume id is always present if user is not null
    };
  }
  return null; // If no user, return null
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Transform the user to the expected type
  const transformedUser = transformUser(user);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <FileUploaderProvider>
            {children}{/* Render the Navbar as part of the page layout */}
            {transformedUser && <Navbar user={transformedUser} />}
            <Toaster
              toastOptions={{
                classNames: {
                  error: 'bg-red-400',
                  success: 'bg-green-400',
                  warning: 'bg-yellow-400',
                },
              }}
            />
          </FileUploaderProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}