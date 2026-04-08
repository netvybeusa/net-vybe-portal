"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useAudioPlayer } from "@/context/AudioPlayerContext";

export default function PlayerPage() {
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek } =
    useAudioPlayer();

  if (!currentTrack) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No track selected
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      <img
        src={currentTrack.artworkUrl || "/nvm-placeholder.png"}
        alt={currentTrack.title}
        className="w-64 h-64 rounded-2xl object-cover mb-6"
      />

      <h1 className="text-2xl font-bold mb-2">
        {currentTrack.title}
      </h1>

      {/* Progress */}
      <div className="w-full max-w-md mb-4">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{Math.floor(progress)}s</span>
          <span>{Math.floor(duration)}s</span>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={togglePlay}
        className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
