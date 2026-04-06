"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { motion } from "framer-motion";
import FullScreenPlayer from "@/components/FullScreenPlayer";

export default function PlayerContent() {
  const searchParams = useSearchParams();
  const trackId = searchParams.get("id");

  const {
    currentTrack,
    playTrack,
    isPlaying,
    togglePlay,
    progress,
    duration,
    seek,
    nextTrack,
    prevTrack,
    openFullScreen,
  } = useAudioPlayer();

  const [trackData, setTrackData] = useState<any>(null);

  // Fetch track data (mocked for now)
  useEffect(() => {
    if (!trackId) return;

    const mockTrack = {
      id: trackId,
      title: "Sample Track",
      audioURL: "/sample.mp3",
      artworkUrl: "/default-art.png",
      genre: "Hip-Hop",
      mood: "Energetic",
    };

    setTrackData(mockTrack);
    playTrack(mockTrack);
  }, [trackId]);

  if (!trackData) {
    return <div className="text-white p-10">Loading track…</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white flex">
      {/* LEFT SIDE CONTENT */}
      <div className="flex flex-col p-12 w-1/2">
        
        {/* ARTWORK + WAVEFORM WRAP */}
        <div className="relative flex items-center justify-center mb-10">
          
          {/* CIRCULAR WAVEFORM HALO */}
          <motion.div
            className="absolute rounded-full"
            animate={{
              boxShadow: isPlaying
                ? [
                    "0 0 40px rgba(168,85,247,0.4)",
                    "0 0 80px rgba(236,72,153,0.5)",
                    "0 0 60px rgba(59,130,246,0.4)",
                  ]
                : "0 0 25px rgba(139,92,246,0.25)",
            }}
            transition={{
              duration: isPlaying ? 1.2 : 0.5,
              repeat: isPlaying ? Infinity : 0,
              repeatType: "mirror",
            }}
            style={{
              width: 360,
              height: 360,
              borderRadius: "50%",
              border: "3px solid rgba(168,85,247,0.4)",
            }}
          />

          {/* ARTWORK */}
          <img
            src={trackData.artworkUrl}
            alt={trackData.title}
            className="w-64 h-64 object-cover rounded-3xl shadow-[0_0_40px_rgba(139,92,246,0.45)] relative z-10"
          />
        </div>

        {/* TITLE + META */}
        <h1 className="text-4xl font-bold text-purple-300 mb-2">
          {trackData.title}
        </h1>
        <p className="text-gray-400 mb-8">
          {trackData.genre} • {trackData.mood}
        </p>

        {/* SCRUBBER */}
        <div className="mb-6">
          <input
            type="range"
            min={0}
            max={duration}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full accent-purple-500"
          />

          <div className="flex justify-between text-gray-400 text-sm mt-1">
            <span>{Math.floor(progress)}s</span>
            <span>{Math.floor(duration)}s</span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-8 mt-6">
          
          {/* PREVIOUS */}
          <button
            onClick={prevTrack}
            className="text-3xl text-purple-300 hover:text-purple-400"
          >
            ⏮
          </button>

          {/* PLAY / PAUSE */}
          <motion.button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-700 shadow-[0_0_35px_rgba(168,85,247,0.45)] flex items-center justify-center text-4xl"
            animate={{
              scale: isPlaying ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.8,
              repeat: isPlaying ? Infinity : 0,
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </motion.button>

          {/* NEXT */}
          <button
            onClick={nextTrack}
            className="text-3xl text-purple-300 hover:text-purple-400"
          >
            ⏭
          </button>

          {/* FULL SCREEN */}
          <button
            onClick={openFullScreen}
            className="text-3xl text-purple-300 hover:text-purple-400 ml-6"
          >
            ⛶
          </button>
        </div>
      </div>

      {/* FULL SCREEN OVERLAY */}
      <FullScreenPlayer />
    </div>
  );
}
