import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import QuickMenu from "@/components/QuickMenu";
import HaloMenu from "@/components/HaloMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Net Vybe Music",
  description: "Artist-first streaming platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* ✅ ONLY ONE PLAYER SYSTEM */}
          <AudioPlayerProvider>
            {children}

            <QuickMenu />
            <HaloMenu />
          </AudioPlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}