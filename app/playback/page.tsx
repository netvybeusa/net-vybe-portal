"use client";

import BackButton from "@/components/BackButton";

export default function PlaybackPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <BackButton to="/dashboard" />

      <h1 className="text-3xl font-bold text-purple-300 mt-6">
        Playback
      </h1>

      <p className="text-gray-400 mt-2">
        Your full-screen player UI will go here.
      </p>
    </div>
  );
}
