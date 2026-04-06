"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";

export default function FullScreenPlayer({
  isOpen,
  onClose,
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  progress,
  duration,
  onSeek,
}: any) {
  if (!track) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[999] flex flex-col items-center p-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-purple-300 hover:text-purple-400 transition"
          >
            <X size={32} />
          </button>

          {/* Artwork */}
          <div className="mt-10 w-64 h-64 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.5)]">
            <Image
              src={track.artwork || "/default-art.png"}
              alt="Artwork"
              width={256}
              height={256}
              className="object-cover"
            />
          </div>

          {/* Track Info */}
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-purple-300">
              {track.title}
            </h2>
            <p className="text-gray-400 mt-1">{track.artist || "Unknown Artist"}</p>
          </div>

          {/* Waveform Placeholder */}
          <div className="w-full max-w-xl h-24 mt-10 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center text-purple-300">
              Waveform
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xl mt-10">
            <input
              type="range"
              min={0}
              max={duration || 1}
              value={progress}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-gray-400 text-sm mt-1">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-10 mt-10">
            <button onClick={onPrev} className="text-purple-300 hover:text-purple-400">
              <SkipBack size={40} />
            </button>

            <button
              onClick={onPlayPause}
              className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-700 shadow-[0_0_30px_rgba(168,85,247,0.7)] flex items-center justify-center transition"
            >
              {isPlaying ? <Pause size={40} /> : <Play size={40} />}
            </button>

            <button onClick={onNext} className="text-purple-300 hover:text-purple-400">
              <SkipForward size={40} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function formatTime(sec: number) {
  if (!sec) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
