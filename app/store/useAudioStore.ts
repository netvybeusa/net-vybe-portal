import { create } from "zustand";

export type Track = {
  id: string;
  title: string;
  artist?: string;
  url: string;
  artworkUrl?: string;
};

type RepeatMode = "off" | "one" | "all";

type AudioState = {
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  shuffle: boolean;
  repeatMode: RepeatMode;

  setQueue: (tracks: Track[], startIndex?: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;

  playNext: () => void;
  playPrevious: () => void;

  toggleShuffle: () => void;
  cycleRepeatMode: () => void;

  getCurrentTrack: () => Track | null;
};

export const useAudioStore = create<AudioState>((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  shuffle: false,
  repeatMode: "off",

  // Set queue + start playing
  setQueue: (tracks, startIndex = 0) =>
    set({
      queue: tracks,
      currentIndex: startIndex,
      isPlaying: true,
    }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  // NEXT TRACK LOGIC
  playNext: () => {
    const { queue, currentIndex, shuffle, repeatMode } = get();
    if (!queue.length) return;

    // Repeat One → stay on same track
    if (repeatMode === "one") {
      return;
    }

    // Shuffle Mode
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      set({ currentIndex: randomIndex, isPlaying: true });
      return;
    }

    // End of queue
    if (currentIndex === queue.length - 1) {
      if (repeatMode === "all") {
        set({ currentIndex: 0, isPlaying: true });
      } else {
        set({ isPlaying: false });
      }
    } else {
      set({ currentIndex: currentIndex + 1, isPlaying: true });
    }
  },

  // PREVIOUS TRACK LOGIC
  playPrevious: () => {
    const { queue, currentIndex } = get();
    if (!queue.length) return;

    if (currentIndex === 0) {
      set({ currentIndex: 0, isPlaying: true });
    } else {
      set({ currentIndex: currentIndex - 1, isPlaying: true });
    }
  },

  // SHUFFLE
  toggleShuffle: () =>
    set((s) => ({
      shuffle: !s.shuffle,
    })),

  // REPEAT MODES: off → one → all → off
  cycleRepeatMode: () =>
    set((s) => {
      const order: RepeatMode[] = ["off", "one", "all"];
      const idx = order.indexOf(s.repeatMode);
      const next = order[(idx + 1) % order.length];
      return { repeatMode: next };
    }),

  // CURRENT TRACK
  getCurrentTrack: () => {
    const { queue, currentIndex } = get();
    if (!queue.length) return null;
    return queue[currentIndex] ?? null;
  },
}));
