"use client";

import Link from "next/link";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

export default function PlayerPage() {
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek } =
    useAudioPlayer();

  if (!currentTrack) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center px-6">
        <div className="absolute top-6 left-6">
          <Link
            href="/music"
            className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
          >
            ← Back to Library
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-4">
            Player
          </h1>

          <p className="text-gray-300 mb-6">
            No track selected yet.
          </p>

          <Link
            href="/music"
            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]"
          >
            Go to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/music"
            className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
          >
            ← Back to Library
          </Link>

          <div className="text-sm uppercase tracking-[0.25em] text-purple-300/60">
            Net Vybe Player
          </div>
        </div>

        <div className="rounded-[2rem] border border-purple-500/20 bg-[#11121A]/95 shadow-[0_0_40px_rgba(139,92,246,0.15)] p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={currentTrack.artworkUrl || "/nvm-placeholder.png"}
                  alt={currentTrack.title}
                  className={`w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-[2rem] object-cover shadow-[0_0_40px_rgba(168,85,247,0.28)] transition-transform duration-300 ${
                    isPlaying ? "scale-[1.01]" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/5" />
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-purple-300/60 mb-4">
                Now Playing
              </p>

              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                {currentTrack.title}
              </h1>

              <div className="text-base md:text-lg text-gray-400 mb-10">
                {currentTrack.genre || "Unknown Genre"}
                {currentTrack.mood ? ` • ${currentTrack.mood}` : ""}
              </div>

              <div className="mb-3">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2"
                />
              </div>

              <div className="flex justify-between text-sm text-gray-400 mb-10">
                <span>{Math.floor(progress)}s</span>
                <span>{Math.floor(duration)}s</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>

                <Link
                  href="/music"
                  className="rounded-full bg-white/10 px-6 py-4 text-sm font-medium text-white hover:bg-white/20 transition"
                >
                  Browse Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
