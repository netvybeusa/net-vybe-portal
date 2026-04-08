"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Track = {
  id: string;
  title: string;
  url?: string;
  audioURL?: string;
  artworkUrl?: string;
  genre?: string;
  mood?: string;
};

type AudioPlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  playTrack: (track: Track) => void;
  pause: () => void;
  togglePlay: () => void;
  isMiniPlayerOpen: boolean;
  openMiniPlayer: () => void;
  closeMiniPlayer: () => void;
  duration: number;
  progress: number;
  seek: (time: number) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState(false);

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const playTrack = async (track: Track) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const source = track.url || track.audioURL;

    console.log("🎧 PLAY TRIGGERED", track);
    console.log("🎧 SOURCE URL:", source);

    if (!source) {
      console.warn("❌ No audio source found");
      return;
    }

    const normalizedTrack: Track = {
      ...track,
      url: source,
    };

    setCurrentTrack(normalizedTrack);
    setIsMiniPlayerOpen(true);
    setProgress(0);
    setDuration(0);

    setQueue((prev) => {
      const exists = prev.find((t) => t.id === track.id);
      return exists ? prev : [...prev, normalizedTrack];
    });

    audio.pause();
    audio.currentTime = 0;

    try {
      audio.src = source;
      audio.load();
      await audio.play();

      console.log("✅ Audio playing");
      setIsPlaying(true);
    } catch (err) {
      console.error("❌ Audio play failed:", err);
      alert("This audio format is not supported. Please upload an MP3.");
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = async () => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;

    if (isPlaying) {
      pause();
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("❌ Play failed:", err);
      }
    }
  };

  const openMiniPlayer = () => setIsMiniPlayerOpen(true);
  const closeMiniPlayer = () => setIsMiniPlayerOpen(false);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const seek = (time: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
    setProgress(time);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        playTrack,
        pause,
        togglePlay,
        isMiniPlayerOpen,
        openMiniPlayer,
        closeMiniPlayer,
        duration,
        progress,
        seek,
      }}
    >
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