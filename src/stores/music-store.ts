import { create } from "zustand";

interface BackgroundMusicStore {
    sholdPlay: boolean,
    /** Toggles if no parameters given */
    setShouldPlay: (v: boolean) => void
    toggleShouldPlay: () => void
}

export const useBackgroundMusic = create<BackgroundMusicStore>(set => ({
    sholdPlay: true,
    setShouldPlay: (v) => set({ sholdPlay: v }),
    toggleShouldPlay: () => set(old => ({ sholdPlay: !old.sholdPlay })),
}))
