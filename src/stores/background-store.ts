import { create } from "zustand"

import type { Backdrop } from "@devrals/backdrops"
import { WebGlEngine } from "@devrals/webgl-engine"
import { use2DCanvasBgOptions } from "@/hooks/use2DCanvasBg";
import { useBackgroundOptions as useWebglBackgroundOptions } from "@/hooks/useWebglEngineBg";
import { MantineColor } from "@mantine/core";

import DustForce from "@devrals/backdrops/dustforce";
import DreamStars from "@devrals/backdrops/dream-stars";
import BlackHole from "@devrals/backdrops/black_hole";
import GraphStructure from "@devrals/backdrops/graph-structure";
import AmongUs from "@devrals/backdrops/among-us"
import ThirdSanctuary from "@devrals/backdrops/third-sanctuary"

import frozen_hot_sauce from "@/assets/songs/frozen_hot_sauce.webm"
import resurrections from "@/assets/songs/resurrection.webm"
import amongus_hide_and_seek from "@/assets/songs/amongus-hide-and-seek.webm"
import golden_ratio from "@/assets/songs/golden_ratio.webm"
import tick_tock from "@/assets/songs/tick_tock.webm"
import third_sanctuary from "@/assets/songs/third_sanctuary.webm"

import frozen_hot_sauce_cover from "@/assets/songs/frozen_hot_sauce_cover.jpg"
import resurrections_cover from "@/assets/songs/resurrections_cover.webp"
import amongus_hide_and_seek_cover from "@/assets/songs/amongus-hide-and-seek.webp"
import golden_ratio_cover from "@/assets/songs/golden_ratio_cover.webp"
import tick_tock_cover from "@/assets/songs/tick_tock_cover.webp"
import third_sanctuary_cover from "@/assets/songs/third_sanctuary_cover.webp"

interface Background {
    type: "2d" | "webgl",
    name: string & {}
    color: MantineColor,
    track?: { src: HTMLAudioElement, name: string, cover: string },
}

export interface Background2D extends Background {
    effect: Backdrop<CanvasRenderingContext2D>,
    hookOptions: Omit<use2DCanvasBgOptions, "effect">,
}

export interface BackgroundWebglEngine extends Background {
    effect: Backdrop<WebGlEngine>,
    hookOptions: Omit<useWebglBackgroundOptions, "effect">,
}

export const backgrounds: (Background2D | BackgroundWebglEngine)[] = [
    {
        type: "2d",
        name: "the-third-sanctuary",
        effect: new ThirdSanctuary(),
        hookOptions: {},
        color: "blue",
        track: {
            name: "'The Third Sanctuary' from Deltarune - Toby Fox",
            cover: third_sanctuary_cover,
            src: new Audio(third_sanctuary)
        }
    },
    {
        type: "2d",
        name: "dust-force",
        effect: new DustForce(),
        track: {
            src: new Audio(frozen_hot_sauce),
            name: "'Frozen Hot Sauce' from Dustforce - Lifeformed",
            cover: frozen_hot_sauce_cover
        },
        color: "violet",
        hookOptions: {},
    },

    {
        type: "2d",
        name: "dream-stars",
        effect: new DreamStars(),
        track: {
            src: new Audio(resurrections),
            name: "'Resurrections' from Celeste - Lena Rain",
            cover: resurrections_cover
        },
        color: "teal",
        hookOptions: {}
    },

    {
        type: "2d",
        name: "black-hole",
        color: "orange",
        effect: new BlackHole(25),
        hookOptions: { resolution: BlackHole.resolution },
        track: {
            name: "'Tick Tock' from Interstellar - Hanz Zimmer",
            cover: tick_tock_cover,
            src: new Audio(tick_tock)
        }
    },

    {
        type: "2d",
        name: "graph-structure",
        color: "gray",
        effect: new GraphStructure(),
        track: {
            name: "'Golden Ratio' from Animation vs. Geometry - Avenza",
            src: new Audio(golden_ratio),
            cover: golden_ratio_cover
        },
        hookOptions: { resolution: GraphStructure.resolution }
    },

    // {
    //     type: "webgl",
    //     effect: new NorthernLights(),
    //     hookOptions: { updateFunctionEnabled: false }
    // }

    {
        type: "2d",
        name: "SUS",
        effect: new AmongUs(),
        color: "red",
        hookOptions: { resolution: AmongUs.resolution },
        track: {
            name: "'Seek' from AmongUs - Innersloth",
            src: new Audio(amongus_hide_and_seek),
            cover: amongus_hide_and_seek_cover
        }
    }
] as const

interface BackgroundStore {
    current: number, setCurrent: (name: typeof backgrounds[number]["name"] | "next" | "previous") => void
}

export const useBackground2D = create<BackgroundStore>(
    (set) => ({
        current: 0,
        setCurrent: (target) => set(state => {
            if (!target) return state

            if (target === "next") {
                const next = state.current + 1
                return { current: next === backgrounds.length ? 0 : next }
            }

            if (target === "previous") {
                const prev = state.current - 1
                return {
                    current: prev === -1 ? backgrounds.length - 1 : prev
                }
            }

            const index = backgrounds.findIndex(b => b.name === target)
            return { current: index === -1 ? state.current : index }
        })
    })
)
