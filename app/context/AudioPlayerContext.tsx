"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";

interface Track {
  id: string;
  title: string;
  audioURL: string;
  artworkUrl?: string;
  genre?: string;
  mood?: string;
}

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  queue: Track[];
  isFullScreen: boolean;
  isMiniPlayerOpen: boolean;

  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;

  openFullScreen: () => void;
  closeFullScreen: () => void;

  openMiniPlayer: () => void;
  closeMiniPlayer: () => void;

  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);

  // 🔥 LOAD METADATA
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // 🔥 UPDATE PROGRESS
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
  };

  // 🔥 AUTO NEXT
  const handleEnded = () => {
    nextTrack();
  };

  // 🚨 PLAY TRACK (FULL FIXED VERSION)
  const playTrack = (track: Track) => {
    if (!audioRef.current) return;

    console.log("🎧 Playing:", track.audioURL);

    setCurrentTrack(track);
    setIsPlaying(true);

    // Add to queue
    setQueue((prev) => {
      const exists = prev.find((t) => t.id === track.id);
      return exists ? prev : [...prev, track];
    });

    // ✅ RESET AUDIO FIRST
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // ✅ SET SOURCE
    audioRef.current.src = track.audioURL;

    // ✅ FORCE LOAD
    audioRef.current.load();

    // ✅ PLAY (WITH ERROR HANDLING)
    audioRef.current
      .play()
      .then(() => {
        console.log("✅ Audio playing");
      })
      .catch((err) => {
        console.error("❌ Play failed:", err);
      });
  };

  // 🔥 TOGGLE PLAY
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Play error:", err));
    }

    setIsPlaying(!isPlaying);
  };

  // 🔥 SEEK
  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // 🔥 NEXT
  const nextTrack = () => {
    if (!currentTrack) return;

    const index = queue.findIndex((t) => t.id === currentTrack.id);
    const next = queue[index + 1];

    if (next) {
      playTrack(next);
    } else {
      setIsPlaying(false);
    }
  };

  // 🔥 PREV
  const prevTrack = () => {
    if (!currentTrack) return;

    const index = queue.findIndex((t) => t.id === currentTrack.id);
    const prev = queue[index - 1];

    if (prev) {
      playTrack(prev);
    }
  };

  const openFullScreen = () => setIsFullScreen(true);
  const closeFullScreen = () => setIsFullScreen(false);

  const openMiniPlayer = () => setIsMiniPlayerOpen(true);
  const closeMiniPlayer = () => setIsMiniPlayerOpen(false);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        queue,
        isFullScreen,
        isMiniPlayerOpen,

        playTrack,
        togglePlay,
        seek,
        nextTrack,
        prevTrack,

        openFullScreen,
        closeFullScreen,

        openMiniPlayer,
        closeMiniPlayer,

        audioRef,
      }}
    >
      {/* 🔥 IMPORTANT: AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
}