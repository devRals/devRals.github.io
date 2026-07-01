import { use2DCanvasBg } from "@/hooks/use2DCanvasBg";

import { Backdrop } from "@devrals/backdrops"
import { Resolution, WebGlEngine } from "@devrals/webgl-engine"
import useWebglEngineBg from "@/hooks/useWebglEngineBg";
import { Background2D, BackgroundWebglEngine } from "@/stores/background-store";


export function setupCanvasStyles(canvas: HTMLCanvasElement, resolution: Resolution) {
    canvas.style.height = "100vh"
    canvas.style.width = "100vw"
    canvas.style.overflow = "hidden"
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.imageRendering = "pixelated"

    canvas.width = resolution.width
    canvas.height = resolution.height
}

export default ({ bg }: { bg: Background2D | BackgroundWebglEngine }) => {
    const canvasRef = getCanvasRef(bg)

    return <div style={{
        background: "#000"
    }} className="background">
        <canvas ref={canvasRef} className="background"></canvas>

    </div>
}

function getCanvasRef({ effect, type, hookOptions }: Background2D | BackgroundWebglEngine) {
    return (type === "2d") ? use2DCanvasBg({
        effect: effect as Backdrop<CanvasRenderingContext2D>, ...hookOptions
    }).canvasRef : useWebglEngineBg({
        effect: effect as Backdrop<WebGlEngine>, ...hookOptions
    }).canvasRef
}

