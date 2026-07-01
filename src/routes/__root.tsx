import { createRootRoute, NotFoundRouteComponent, Outlet } from '@tanstack/react-router'
import { useCurrentBackground } from '@/stores/background-store'
import { Center, Divider, Paper, Stack, Image, Box, Title, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useBackgroundMusic } from '@/stores/music-store';
import { showNotification } from '@mantine/notifications';

import { Swapper } from '@/components/backgrounds/swapper';
import Backgrounds2D from "@/components/backgrounds"
import Header from '@/components/layout/header';
import MediaPlayer from '@/components/media-player';
import Navigation from '@/components/layout/navigation';
import Status from '@/components/layout/status';
import Footer from '@/components/layout/footer';

const Contents = () => (
    <Stack>
        <Header />
        <MediaPlayer />
        <Status />
        <Navigation />
        <Divider />
        <Outlet />
        <Divider />
        <Footer />
    </Stack>
)
const RootLayout = () => {
    const background = useCurrentBackground()
    const shouldPlay = useBackgroundMusic(s => s.sholdPlay)
    const { track, color: themeColor } = background


    useEffect(() => {
        if (!track || !shouldPlay) return

        showNotification({
            message: `Now playing: ${track.name}`,
            color: themeColor,
            icon: <Image w={30} h={30} src={track.cover} />
        })
    }, [track])

    return (
        <>
            <Swapper duration={250} content={
                <Backgrounds2D bg={background} />
            } />

            <Box pos="absolute" top={40} right="5%" visibleFrom="xs" w={400} >
                <Paper mb="lg">
                    <Contents />
                </Paper>
            </Box>
            <Center mb="lg" hiddenFrom="xs">
                <Paper w={400} mb="lg">
                    <Contents />
                </Paper>
            </Center>
        </>
    )
}

const NotFound: NotFoundRouteComponent = () => {
    return (
        <Stack>
            <Title order={2}>404 QwQ</Title>
            <Text style={{ overflow: "hidden", wordWrap: "break-word" }}>
                MU
                {Array.from({ length: 2000 }).map((_, i) =>
                    i % 2 == 0 ? "H" : "A"
                )}
                !!!
            </Text>
        </Stack>
    )
}

export const Route = createRootRoute({
    component: RootLayout,
    notFoundComponent: NotFound,
    errorComponent: null
})
