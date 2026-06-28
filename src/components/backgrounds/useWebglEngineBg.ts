import { Resolution, WebGlEngine } from "@devrals/webgl-engine";
import { useEffect, useRef } from "react";
import { Backdrop } from "@devrals/backdrops";
import { setupCanvasStyles } from "."
import { DEFAULT_RENDER_RESOLUTION } from "./use2DCanvasBg";

export type useBackgroundOptions = {
    effect: Backdrop<WebGlEngine>,
    drawTime?: number,
    updateFunctionEnabled?: boolean,
    resolution?: Resolution,
    deltaTimeFactorizer?: number
}

export default function useWebglEngineBg({
    updateFunctionEnabled = true,
    resolution = DEFAULT_RENDER_RESOLUTION,
    deltaTimeFactorizer = 0.001,
    ...options
}: useBackgroundOptions) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const effect = useRef(options.effect)

    useEffect(() => {
        if (!canvasRef.current) return

        setupCanvasStyles(canvasRef.current, resolution)

        const engine = new WebGlEngine(canvasRef.current)
        engine.fullscreenFrameBufferSettings = {
            enabled: true,
            resolution
        }

        const init = async () => {
            await engine.init()
            await effect.current.init(engine)
        }

        let animationId: number
        let lastFrame = performance.now()
        const render = () => {
            const now = performance.now()
            const Δtime = (now - lastFrame) * deltaTimeFactorizer // as seconds
            lastFrame = now

            const dt = options.drawTime ?? Δtime

            engine.clearScreen()
            if (updateFunctionEnabled) effect.current.update(dt)
            engine.draw(dt, (dt) =>
                effect.current.draw(engine, dt))
            animationId = requestAnimationFrame(render)
        }

        const run = async () => {
            await init()
            render()
        }

        run()

        return () => {
            cancelAnimationFrame(animationId)
            effect.current?.destroy?.(engine)
            engine.destroyFrameBuffer()
        }

    }, [options.effect])

    return {
        canvasRef
    }
}
