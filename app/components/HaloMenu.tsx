"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HaloMenu() {
  return (
    <div
      className="
        fixed 
        right-4 
        top-1/3 
        z-[9997]
        flex 
        flex-col 
        gap-4
        md:right-6
      "
    >
      {[
        { label: "Upload", href: "/music/upload" },
        { label: "Library", href: "/music" },
        { label: "Playback", href: "/player" },
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={item.href}
            className="
              block
              px-4 py-2
              rounded-xl
              bg-[#0f0f1a]
              border border-purple-700/40
              shadow-[0_0_25px_rgba(168,85,247,0.45)]
              text-purple-300
              hover:bg-purple-700/30
              hover:text-purple-200
              transition
              text-sm
              font-medium
            "
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
