"use client";

import React from "react";
import Link from "next/link";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col gap-8">
      
      {/* Back Button Placeholder (Step 2 will replace this) */}
      <div>
        <Link 
          href="/dashboard"
          className="text-purple-300 hover:text-purple-400 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]">
        Platform Insights
      </h1>

      {/* Placeholder Card */}
      <div className="border border-purple-700/40 rounded-xl p-6 bg-black/40 shadow-[0_0_25px_rgba(139,92,246,0.35)]">
        <h2 className="text-xl font-semibold text-purple-200 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-300">
          Analytics, performance metrics, and platform insights will appear here.
          This page is now fully routed and ready for future data integration.
        </p>
      </div>
    </div>
  );
}
