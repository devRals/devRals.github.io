import usePlaySong from "@/hooks/usePlaySong";
import { backgrounds, useBackground2D, useCurrentBackground } from "@/stores/background-store";
import { ActionIcon, Affix, Box, Center, Divider, Group, Paper, Slider, Stack, Tooltip, Transition } from "@mantine/core"
import { useState } from "react";
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

    const buttonProps = {
        variant: "subtle",
        radius: "xs",
        color: themeColor
    }

    return (
        <Group>
            <Stack>
                {track && shouldPlay && <div style={{
                    width: `${progress * 100}%`, height: 4,
                    backgroundColor: `var(--mantine-color-${themeColor}-filled)`,
                    borderRadius: 3
                }}></div>}

                <Group pos="relative">
                    <Tooltip label="Enable/Disable Music">
                        <ActionIcon onClick={toggleShouldPlay} {...buttonProps}>
                            {shouldPlay ? <IconMusic /> : <IconMusicX />}
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Previous Theme">
                        <ActionIcon onClick={() => setBackground("previous")} {...buttonProps}>
                            <IconPlayerTrackPrevFilled />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Play/Pause">
                        <ActionIcon disabled={!track || !shouldPlay} onClick={playing ? pause : play} {...buttonProps}>
                            {playing ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Next Theme">
                        <ActionIcon onClick={() => setBackground("next")} {...buttonProps}>
                            <IconPlayerTrackNextFilled />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Volume">
                        <ActionIcon {...buttonProps} onClick={() => setVolumePanelOpened(v => !v)}>
                            <IconVolume />
                        </ActionIcon>
                    </Tooltip>


                    {/* <IconPhotoAlt /> */}
                </Group>

                <Visualizer />

            </Stack>
            <Transition mounted={volumePanelOpened}>
                {styles => (
                    <Slider style={styles} color={themeColor} value={volume} onChange={setVolume} h={110} max={1.0} step={0.05} orientation="vertical" />
                )}
            </Transition>
        </Group>
    )
}

export default () => {
    const { track } = useCurrentBackground()

    return (
        <Box hiddenFrom="xs">
            <Divider label="Player" />
            <Center mt="lg">
                <MediaPlayer track={track?.src} />
            </Center>
            <Affix
                visibleFrom="xs"
                position={{
                    top: 10,
                    left: 10,
                }}>
                <Paper p="xs" withBorder>
                    <MediaPlayer track={track?.src} />
                </Paper>
            </Affix>
        </Box>
    )
}
