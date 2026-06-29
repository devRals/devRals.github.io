import { backgrounds, useBackground2D } from "@/stores/background-store";
import { useEffect, useRef } from "react";
import { parseThemeColor, useMantineTheme } from "@mantine/core";
import { useBackgroundMusic } from "@/stores/music-store";

export default () => {
    const theme = useMantineTheme();
    const currentThemeIndex = useBackground2D((s) => s.current);
    const { color: currentThemeColor, track: currentTrack } = backgrounds[currentThemeIndex];
    const shouldPlay = useBackgroundMusic(s => s.sholdPlay)

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const analyzerRef = useRef<AnalyserNode | null>(null);

    const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
    const connectedSources = useRef<WeakMap<HTMLAudioElement, MediaElementAudioSourceNode>>(new WeakMap());

    useEffect(() => {
        if (!canvasRef.current || !currentTrack) return;

        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext();
            analyzerRef.current = audioCtxRef.current.createAnalyser();
            analyzerRef.current.fftSize = 256;
        }

        const audioCtx = audioCtxRef.current;
        const analyzer = analyzerRef.current!;

        // If a previous source node was playing, disconnect it first
        if (sourceNodeRef.current) {
            try {
                sourceNodeRef.current.disconnect();
            } catch (e) {
                console.warn("Failed to disconnect previous source:", e);
            }
        }

        // Reuse or create the MediaElementSourceNode for the current track
        let media = connectedSources.current.get(currentTrack.src);
        if (!media) {
            try {
                media = audioCtx.createMediaElementSource(currentTrack.src);
                connectedSources.current.set(currentTrack.src, media);
            } catch (e) {
                console.error("Failed to create audio source:", e);
            }
        }

        if (media) {
            media.connect(analyzer);
            analyzer.connect(audioCtx.destination);
            sourceNodeRef.current = media; // Track it as active
        }

        const bufferLength = analyzer.frequencyBinCount;
        const data = new Uint8Array(bufferLength);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;

        let animationId: number;

        const draw = () => {
            animationId = requestAnimationFrame(draw);

            if (audioCtx.state === "suspended") {
                audioCtx.resume();
            }

            analyzer.getByteFrequencyData(data);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const color = parseThemeColor({ color: currentThemeColor, theme }).value;
            const barWidth = canvas.width / bufferLength;

            for (let i = 0; i < bufferLength; i++) {
                const percent = data[i] / 255;
                const barHeight = canvas.height * percent;

                ctx.fillStyle = color;

                const x = i * barWidth;
                const y = canvas.height - barHeight;

                ctx.fillRect(x, y, barWidth - 1, barHeight);
            }
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            if (sourceNodeRef.current) {
                try {
                    sourceNodeRef.current.disconnect();
                } catch (e) {
                    // Ignore if already disconnected
                }
            }
        };
    }, [currentTrack, currentThemeColor, theme]);

    if (!currentTrack || !shouldPlay) return null;

    return (
        <canvas
            ref={canvasRef}
            height={50}
            width={200}
            style={{
                width: "100%"
            }}
        />
    );
};
