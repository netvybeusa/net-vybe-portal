"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-black/40 border-r border-white/10 backdrop-blur-xl p-6 flex flex-col relative">

        {/* Neon Accent Bar */}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-pink-500 via-fuchsia-500 to-purple-500 shadow-[0_0_15px_rgba(255,0,255,0.6)]"></div>

        <h1 className="text-xl font-bold mb-10 tracking-wide">
          Net Vybe Music
        </h1>

        <nav className="flex flex-col gap-3">
          {[
            { label: "Home", path: "/dashboard" },
            { label: "Upload", path: "/dashboard/upload" },
            { label: "Library", path: "/dashboard/library" },
            { label: "Playback", path: "/dashboard/playback" },
            { label: "Profile", path: "/dashboard/profile" },
            { label: "Settings", path: "/dashboard/settings" }
          ].map(({ label, path }) => {
            const isActive = pathname === path;

            return (
              <Link
  key={label}
  href={path}
  className={`
    text-left px-2 py-2 rounded-md transition block
    ${isActive ? "text-pink-400 bg-white/10" : "hover:text-pink-400 hover:bg-white/5"}
  `}
>
  {label}
</Link>
            );
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center px-6 bg-black/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}