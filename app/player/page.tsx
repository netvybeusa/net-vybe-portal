"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Suspense } from "react";
import PlayerContent from "./PlayerContent";

export default function PlayerPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading player...</div>}>
      <PlayerContent />
    </Suspense>
  );
}
