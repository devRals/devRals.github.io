import usePlaySong from "@/hooks/usePlaySong";
import { backgrounds, useBackground2D } from "@/stores/background-store";
import { showNotification } from "@mantine/notifications";
import { ActionIcon, Group, Image, Paper, Slider, Stack, Transition } from "@mantine/core"
import { useEffect, useState } from "react";
import { IconMusic, IconMusicX, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled, IconVolume } from "@tabler/icons-react";
import Visualizer from "./visualizer";
import { useBackgroundMusic } from "@/stores/music-store";

export const MediaPlayer = ({ track }: { track: HTMLAudioElement | undefined }) => {
    const { pause, play, playing, volume, setVolume, progress } = usePlaySong(track)
    const toggleShouldPlay = useBackgroundMusic(s => s.toggleShouldPlay)
    const shouldPlay = useBackgroundMusic(s => s.sholdPlay)
    const [volumePanelOpened, setVolumePanelOpened] = useState(false)

    const setBackground = useBackground2D(s => s.setCurrent)
    const backgroundIndex = useBackground2D(s => s.current)
    const background = backgrounds[backgroundIndex]
    const themeColor = background.color
    const currentTrack = background.track

    useEffect(() => {
        if (!currentTrack || !shouldPlay) return

        showNotification({
            message: `Now playing: ${currentTrack.name}`,
            color: themeColor,
            icon: <Image w={30} h={30} src={currentTrack.cover} />
        })
    }, [track, shouldPlay])

    const buttonProps = {
        variant: "subtle",
        radius: "xs",
        color: themeColor
    }

    return (
        <Stack>
            {track && shouldPlay && <div style={{
                width: `${progress * 100}%`, height: 4,
                backgroundColor: `var(--mantine-color-${themeColor}-filled)`,
                borderRadius: 3
            }}></div>}

            <Group pos="relative">
                <ActionIcon onClick={toggleShouldPlay} {...buttonProps}>
                    {shouldPlay ? <IconMusic /> : <IconMusicX />}
                </ActionIcon>
                <ActionIcon onClick={() => setBackground("previous")} {...buttonProps}>
                    <IconPlayerTrackPrevFilled />
                </ActionIcon>
                <ActionIcon disabled={!track || !shouldPlay} onClick={playing ? pause : play} {...buttonProps}>
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
                        <Paper style={styles} pos="absolute" bottom={-40} right={0} p="xs" bg="dark">
                            <Slider color={themeColor} value={volume} onChange={setVolume} max={1.0} step={0.05} w={150} />
                        </Paper>
                    )}
                </Transition>

                {/* <IconPhotoAlt /> */}
            </Group>

            <Visualizer />

        </Stack>
    )
} 
