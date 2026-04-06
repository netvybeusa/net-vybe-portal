"use client";

import { createContext, useContext } from "react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

interface Track {
  id?: string;
  title?: string;
  url?: string;
  artworkUrl?: string | null;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Partial<Track>) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audio = useAudioPlayer();

  const playTrack = (track: Partial<Track>) => {
    if (!track.url) return;

    audio.playTrack({
      id: track.id || "",
      title: track.title || "Untitled Track",
      audioURL: track.url,
      artworkUrl: track.artworkUrl || "",
    });
  };

  const pauseTrack = () => {
    audio.togglePlay();
  };

  const togglePlay = () => {
    audio.togglePlay();
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack: audio.currentTrack
          ? {
              id: audio.currentTrack.id,
              title: audio.currentTrack.title,
              url: audio.currentTrack.audioURL,
              artworkUrl: audio.currentTrack.artworkUrl,
            }
          : null,
        isPlaying: audio.isPlaying,
        playTrack,
        pauseTrack,
        togglePlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
};
