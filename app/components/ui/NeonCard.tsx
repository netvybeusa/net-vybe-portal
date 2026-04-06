"use client";

import React from "react";

export default function NeonCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center px-4 py-10 bg-[var(--nv-bg)]">
      <div
        className="
          w-full max-w-xl 
          bg-[rgba(20,20,20,0.85)]
          rounded-2xl 
          p-8 
          shadow-[0_0_25px_rgba(139,92,246,0.35)]
          border border-purple-700/30
          backdrop-blur-md
        "
      >
        {children}
      </div>
    </div>
  );
}