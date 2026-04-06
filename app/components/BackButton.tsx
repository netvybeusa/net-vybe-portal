// app/components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ to }: { to?: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (to) {
      router.push(to);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex items-center gap-2 text-purple-300 
        hover:text-purple-400 transition 
        drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]
      "
    >
      <ArrowLeft size={20} />
      <span className="text-sm">Back</span>
    </button>
  );
}
