"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Upload", href: "/music/upload" },
    { name: "Library", href: "/music" },
    { name: "Playback", href: "/player" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-black/40 backdrop-blur-xl border-r border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.35)] p-6 flex flex-col gap-6">
      <h1 className="text-[#ff4fa3] text-xl font-bold tracking-wide">
        NET VYBE MUSIC
      </h1>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md transition-all ${
                active
                  ? "bg-purple-700/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.45)]"
                  : "text-gray-300 hover:text-purple-300 hover:bg-purple-700/20"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
