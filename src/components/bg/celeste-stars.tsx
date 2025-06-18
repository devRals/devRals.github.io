import { useEffect, useRef } from "react";

const starFramesA = [
    "/images/stars/a00.png",
    "/images/stars/a01.png",
    "/images/stars/a02.png",
    "/images/stars/a03.png",
    "/images/stars/a03.png",
    "/images/stars/a02.png",
    "/images/stars/a01.png",
    "/images/stars/a00.png",
];
const starFramesB = [
    "/images/stars/b00.png",
    "/images/stars/b01.png",
    "/images/stars/b02.png",
    "/images/stars/b03.png",
    "/images/stars/b03.png",
    "/images/stars/b02.png",
    "/images/stars/b01.png",
    "/images/stars/b00.png",
];
const starFramesC = [
    "/images/stars/c00.png",
    "/images/stars/c01.png",
    "/images/stars/c02.png",
    "/images/stars/c03.png",
    "/images/stars/c03.png",
    "/images/stars/c02.png",
    "/images/stars/c01.png",
    "/images/stars/c00.png",
];

function getRandomPosition() {
    return [
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
    ];
}

function loadFrames(paths: string[]) {
    return Promise.all(
        paths.map((src) => {
            return new Promise<HTMLImageElement>((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img);
            });
        }),
    );
}

interface Star {
    x: number;
    y: number;
    size: number;
    speed: number;
    frames: HTMLImageElement[];
    frameIndex: number;
    frameDelay: number;
    lastFrameTime: number;
}

export default function PageBg({ dreaming = false }: { dreaming?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        window.addEventListener("resize", handleResize);

        Promise.all([
            loadFrames(starFramesA),
            loadFrames(starFramesB),
            loadFrames(starFramesC),
        ]).then(([framesA, framesB, framesC]) => {
            const allFrames = [framesA, framesB, framesC];

            const stars: Star[] = Array.from({ length: 32 }, () => {
                const frames =
                    allFrames[Math.floor(Math.random() * allFrames.length)];
                const [x, y] = getRandomPosition();
                const size = 24 + Math.random() * 40;
                const speed = 0.09 + Math.random() * 0.1;
                return {
                    x,
                    y,
                    size,
                    speed,
                    frames,
                    frameIndex: Math.floor(Math.random() * frames.length),
                    frameDelay: 100 + Math.random() * 100,
                    lastFrameTime: performance.now(),
                };
            });

            let lastTime = performance.now();

            const render = (time: number) => {
                const delta = time - lastTime;
                lastTime = time;

                ctx.fillStyle = "rgba(0,0,0,0.1)";
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

                for (const star of stars) {
                    if (time - star.lastFrameTime >= star.frameDelay) {
                        star.frameIndex = (star.frameIndex + 1) %
                            star.frames.length;
                        star.lastFrameTime = time;
                    }

                    if (dreaming) star.y += star.speed * delta;

                    if (star.y > window.innerHeight) {
                        star.y = -star.size;
                        star.x = Math.random() * window.innerWidth;
                    }

                    const frame = star.frames[star.frameIndex];
                    ctx.drawImage(frame, star.x, star.y, star.size, star.size);
                }

                requestAnimationFrame(render);
            };

            requestAnimationFrame(render);
        });

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [dreaming]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                backgroundColor: "#000",
                imageRendering: "pixelated",
                width: "100vw",
                height: "100vh",
            }}
        />
    );
}
