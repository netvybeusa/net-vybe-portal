"use client";

import { useRef, useState, useEffect } from "react";

export default function AudioPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    setProgress((current / total) * 100);
  };

  return (
    <div className="w-full flex items-center gap-3">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Play Button */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-[var(--nv-purple)] hover:bg-[var(--nv-blue)] flex items-center justify-center shadow-[0_0_12px_var(--nv-purple)] hover:shadow-[0_0_18px_var(--nv-blue)] transition"
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>

      {/* Progress Bar */}
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--nv-purple)] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}