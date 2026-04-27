"use client";

import Link from "next/link";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

export default function PlaybackPage() {
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek } =
    useAudioPlayer();

  if (!currentTrack) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-4">
          Playback
        </h1>

        <p className="text-gray-300 mb-6 text-center">
          No track selected yet.
        </p>

        <Link
          href="/music"
          className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]"
        >
          Go to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/music"
            className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
          >
            ← Back to Library
          </Link>
        </div>

        <div className="rounded-3xl border border-purple-500/20 bg-[#11121A]/95 shadow-[0_0_40px_rgba(139,92,246,0.15)] p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <img
                src={currentTrack.artworkUrl || "/nvm-placeholder.png"}
                alt={currentTrack.title}
                className="w-72 h-72 md:w-80 md:h-80 rounded-3xl object-cover shadow-[0_0_35px_rgba(168,85,247,0.35)]"
              />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-purple-300/70 mb-3">
                Now Playing
              </p>

              <h1 className="text-3xl md:text-5xl font-bold text-purple-200 mb-3">
                {currentTrack.title}
              </h1>

              <div className="text-sm text-gray-400 mb-8">
                {currentTrack.genre || "Unknown Genre"}
                {currentTrack.mood ? ` • ${currentTrack.mood}` : ""}
              </div>

              <div className="mb-4">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>{Math.floor(progress)}s</span>
                  <span>{Math.floor(duration)}s</span>
                </div>
              </div>

              <button
                onClick={togglePlay}
                className="mt-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}