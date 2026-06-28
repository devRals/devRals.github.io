import { create } from "zustand"

import type { Backdrop } from "@devrals/backdrops"
import { use2DCanvasBgOptions } from "./use2DCanvasBg";
import { useBackgroundOptions } from "./useWebglEngineBg";
import { WebGlEngine } from "@devrals/webgl-engine"

import DustForce from "@devrals/backdrops/dustforce";
import DreamStars from "@devrals/backdrops/dream-stars";
import BlackHole from "@devrals/backdrops/black_hole";
import GraphStructure from "@devrals/backdrops/graph-structure";
import AmongUs from "@devrals/backdrops/among-us"

import frozen_hot_sauce from "./songs/frozen_hot_sauce.mp4"
import resurrections from "./songs/resurrections.webm"

interface Background {
    type: "2d" | "webgl"
    track?: HTMLAudioElement,
}

export interface Bacground2D extends Background {
    effect: Backdrop<CanvasRenderingContext2D>,
    hookOptions: Omit<use2DCanvasBgOptions, "effect">,
}

export interface BackgroundWebglEngine extends Background {
    effect: Backdrop<WebGlEngine>,
    hookOptions: Omit<useBackgroundOptions, "effect">,
}

export const backgrounds = [
    {
        type: "2d",
        name: "dust-force",
        effect: new DustForce(),
        track: new Audio(frozen_hot_sauce),
        hookOptions: {},
    },

    {
        type: "2d",
        name: "dream-stars",
        effect: new DreamStars(),
        track: new Audio(resurrections),
        hookOptions: {}
    },

    {
        type: "2d",
        name: "black-hole",
        effect: new BlackHole(),
        hookOptions: { resolution: BlackHole.resolution },
    },

    {
        type: "2d",
        name: "graph-structure",
        effect: new GraphStructure(),
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
        hookOptions: { resolution: AmongUs.resolution }
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
