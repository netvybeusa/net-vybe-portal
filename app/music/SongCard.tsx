"use client";

import DeleteTrackButton from "@/components/DeleteTrackButton";
import Image from "next/image";
import { format } from "date-fns";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

type Song = {
  id: string;
  title?: string;
  genre?: string | null;
  mood?: string | null;
  artworkUrl?: string | null;
  artworkPath?: string | null;
  url?: string | null;
  audioURL?: string | null;
  createdAt?: { seconds: number; nanoseconds: number } | null;
  storagePath?: string | null;
};

type SongCardProps = {
  song: Song;
};

export default function SongCard({ song }: SongCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudioPlayer();

  const coverSrc = song.artworkUrl || "/nvm-placeholder.png";
  const audioUrl = song.url || song.audioURL || "";

  const rawDate = song.createdAt?.seconds
    ? new Date(song.createdAt.seconds * 1000)
    : null;

  const displayDate = rawDate ? format(rawDate, "MMM d, yyyy") : "Just now";
  const isActive = currentTrack?.id === song.id;

  const handlePlayPause = () => {
    if (!audioUrl) return;

    if (isActive) {
      togglePlay();
    } else {
      playTrack({
        id: song.id,
        title: song.title || "Untitled Track",
        url: audioUrl,
        artworkUrl: coverSrc,
        genre: song.genre || "",
        mood: song.mood || "",
      });
    }
  };

  return (
    <div
      className={`group bg-[#11121A] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden transition ${
        isActive
          ? "shadow-[0_0_35px_rgba(162,89,255,0.55)]"
          : "hover:shadow-[0_0_30px_rgba(162,89,255,0.4)]"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={coverSrc}
          alt={song.title || "Track Artwork"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-300 ${
            isActive && isPlaying ? "scale-110" : "group-hover:scale-105"
          }`}
        />

        <button
          onClick={handlePlayPause}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 text-xs font-semibold border border-[rgba(255,255,255,0.2)] hover:bg-black/90 transition"
        >
          {isActive && isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <div className="p-3">
        <div className="text-sm font-semibold truncate">
          {song.title || "Untitled Track"}
        </div>

        {(song.genre || song.mood) && (
          <div className="text-[11px] text-[var(--nv-text-muted)] mt-0.5">
            {song.genre || "Unknown Genre"} • {song.mood || "Unknown Mood"}
          </div>
        )}

        <div className="text-[10px] text-[var(--nv-text-muted)] mt-1">
          {displayDate}
        </div>

        {song.storagePath && (
          <div className="mt-3 flex justify-end">
            <DeleteTrackButton
              trackId={song.id}
              storagePath={song.storagePath}
              artworkPath={song.artworkPath || undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
}