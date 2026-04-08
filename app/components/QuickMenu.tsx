"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function QuickMenu() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    progress,
    duration,
    seek,
    isMiniPlayerOpen,
    openMiniPlayer,
    closeMiniPlayer,
  } = useAudioPlayer();

  const pathname = usePathname();
  const isOnPlayerPage = pathname?.startsWith("/player") ?? false;

  useEffect(() => {
    if (isOnPlayerPage) {
      closeMiniPlayer();
    }
  }, [isOnPlayerPage, closeMiniPlayer]);

  console.log("🎛 QuickMenu", {
    currentTrack,
    isMiniPlayerOpen,
    isOnPlayerPage,
  });

  return (
    <>
      <div className="pb-safe-area" />

      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-16 md:h-16 z-[9998] rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-[0_0_25px_rgba(168,85,247,0.45)] flex items-center justify-center cursor-pointer"
        onClick={() => {
          if (currentTrack) openMiniPlayer();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-white text-xl md:text-2xl">🎵</span>
      </motion.div>

      <AnimatePresence>
        {isMiniPlayerOpen && currentTrack && !isOnPlayerPage && (
          <motion.div
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] rounded-3xl bg-[#0f0f1a] border border-purple-700/40 shadow-[0_0_35px_rgba(139,92,246,0.45)] p-6 w-[85vw] md:w-80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <button
              onClick={closeMiniPlayer}
              className="absolute top-3 right-3 text-purple-300 hover:text-purple-400"
            >
              ✕
            </button>

            <div className="flex md:flex-row flex-col items-center md:items-start gap-4 mb-4 text-center md:text-left">
              <img
                src={currentTrack.artworkUrl || "/nvm-placeholder.png"}
                alt={currentTrack.title}
                className="w-16 h-16 rounded-xl object-cover shadow-[0_0_20px_rgba(168,85,247,0.35)]"
              />

              <div>
                <p className="text-purple-300 font-semibold">
                  {currentTrack.title}
                </p>

                <Link
                  href={`/player?id=${currentTrack.id}`}
                  className="text-xs text-gray-400 hover:text-purple-300"
                >
                  Open full player →
                </Link>
              </div>
            </div>

            <div className="mb-4 w-full">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 md:h-1 rounded-lg"
              />

              <div className="flex justify-between text-gray-400 text-xs mt-1">
                <span>{Math.floor(progress)}s</span>
                <span>{Math.floor(duration)}s</span>
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={togglePlay}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-[0_0_25px_rgba(168,85,247,0.45)] flex items-center justify-center text-2xl md:text-3xl text-white"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}