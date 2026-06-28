import { Backdrop } from "@devrals/backdrops"
import { Resolution } from "@devrals/webgl-engine"
import { useEffect, useRef } from "react"
import { setupCanvasStyles } from "."

export const DEFAULT_RENDER_RESOLUTION: Resolution = {
    width: 320,
    height: 180,
}

export type use2DCanvasBgOptions = {
    effect: Backdrop<CanvasRenderingContext2D>,
    updateFunctionEnabled?: boolean,
    resolution?: Resolution,
    deltaTimeFactorizer?: number,
}

export const use2DCanvasBg = ({
    effect,
    updateFunctionEnabled = true,
    deltaTimeFactorizer = 0.001,
    resolution = DEFAULT_RENDER_RESOLUTION,
}: use2DCanvasBgOptions) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        setupCanvasStyles(canvasRef.current, resolution)

        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) throw new Error("WTF!? Update your browser you caveman! I can't have access to 2D render canvas!")

        let animationId: number

        let lastFrame = performance.now()
        const draw = () => {
            const now = performance.now()
            const Δtime = (now - lastFrame) * deltaTimeFactorizer
            lastFrame = now

            if (updateFunctionEnabled) effect.update(Δtime)
            effect.draw(ctx, Δtime)

            animationId = requestAnimationFrame(draw)
        }

        const run = async () => {
            await effect.init(ctx)
            draw()
        }

        run()

        return () => {
            // effect.destroy?.(ctx)
            cancelAnimationFrame(animationId)
        }
    }, [effect])

    return {
        canvasRef
    }
}
