import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BackgroundMusicStore {
    sholdPlay: boolean,
    /** Toggles if no parameters given */
    setShouldPlay: (v: boolean) => void
    toggleShouldPlay: () => void
}

export const useBackgroundMusic = create<BackgroundMusicStore, [["zustand/persist", BackgroundMusicStore]]>(persist(set => ({
    sholdPlay: false,
    setShouldPlay: (v) => set({ sholdPlay: v }),
    toggleShouldPlay: () => set(old => ({ sholdPlay: !old.sholdPlay })),
}), { name: "background-audio-should-play" }))
