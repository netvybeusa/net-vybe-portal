"use client";

import { useAudioPlayer } from "@/context/PlayerContext";

export default function NowPlayingBar() {
  const { currentTrack, isPlaying, togglePlay } = useAudioPlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0b0b14]/90 backdrop-blur-md border-t border-white/10 shadow-[0_0_20px_rgba(255,0,255,0.2)] p-4 flex items-center gap-4 z-50">

      {/* Artwork */}
      {currentTrack.artworkUrl ? (
        <img
          src={currentTrack.artworkUrl}
          alt="art"
          className="w-14 h-14 rounded-lg object-cover shadow-[0_0_12px_rgba(255,0,255,0.4)]"
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-pink-600/30 to-purple-700/30" />
      )}

      {/* Title */}
      <div className="flex-1">
        <p className="text-white font-semibold">{currentTrack.title}</p>
      </div>

      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}