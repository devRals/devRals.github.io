import { use2DCanvasBg } from "./use2DCanvasBg";
import { useState } from "react";
import usePlaySong from "./usePlaySong";
import { Affix, Paper, Group, ActionIcon, Transition, Slider, Stack } from "@mantine/core";
import { IconMusic, IconPhotoAlt, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled, IconVolume } from "@tabler/icons-react";

import { Backdrop } from "@devrals/backdrops"
import { Resolution, WebGlEngine } from "@devrals/webgl-engine"
import useWebglEngineBg from "./useWebglEngineBg";
import { Bacground2D, BackgroundWebglEngine, useBackground2D } from "./store";


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

export default ({ bg }: { bg: Bacground2D | BackgroundWebglEngine }) => {
    const canvasRef = getCanvasRef(bg)

    return <div style={{
        background: "#000"
    }} className="background">
        <canvas ref={canvasRef} className="background"></canvas>

        <Affix position={{
            bottom: 10,
            right: 10,
        }}>
            <Paper p="xs">
                <MediaPlayer track={bg.track} />
            </Paper>
        </Affix>
    </div>
}

function getCanvasRef({ effect, type, hookOptions }: Bacground2D | BackgroundWebglEngine) {
    return (type === "2d") ? use2DCanvasBg({
        effect: effect as Backdrop<CanvasRenderingContext2D>, ...hookOptions
    }).canvasRef : useWebglEngineBg({
        effect: effect as Backdrop<WebGlEngine>, ...hookOptions
    }).canvasRef
}

const MediaPlayer = ({ track }: { track: HTMLAudioElement | undefined }) => {
    const { pause, play, playing, volume, setVolume, progress } = usePlaySong(track)
    const setBackground = useBackground2D(s => s.setCurrent)
    const [volumePanelOpened, setVolumePanelOpened] = useState(false)

    const buttonProps = {
        variant: "subtle",
        color: "gray",
        radius: "xs",
        size: "lg"
    }

    return (
        <Stack>
            <div style={{
                width: `${progress * 100}%`, height: 4,
                backgroundColor: "var(--mantine-primary-color-5)"
            }}></div>

            <Group pos="relative">


                <IconMusic />
                <ActionIcon onClick={() => setBackground("previous")} {...buttonProps}>
                    <IconPlayerTrackPrevFilled />
                </ActionIcon>
                <ActionIcon disabled={!track} onClick={playing ? pause : play} {...buttonProps}>
                    {playing ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                </ActionIcon>
                <ActionIcon onClick={() => setBackground("next")} {...buttonProps}>
                    <IconPlayerTrackNextFilled />
                </ActionIcon>

                <ActionIcon {...buttonProps} onClick={() => setVolumePanelOpened(v => !v)}>
                    <IconVolume />
                </ActionIcon>

                <Transition mounted={volumePanelOpened}>
                    {styles => (
                        <Paper style={styles} pos="absolute" top={-40} right={0}>
                            <Slider value={volume} onChange={setVolume} max={1.0} step={0.05} w={150} />
                        </Paper>
                    )}
                </Transition>

                <IconPhotoAlt />
            </Group>
        </Stack>
    )
} 
