"use client";

import { AuthProvider } from "@/context/AuthContext";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import QuickMenu from "@/components/QuickMenu";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AudioPlayerProvider>
        {children}
        <QuickMenu />
      </AudioPlayerProvider>
    </AuthProvider>
  );
}
