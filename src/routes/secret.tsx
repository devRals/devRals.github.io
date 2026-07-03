import { useCurrentBackground } from '@/stores/background-store';
import { Anchor, Center, Group, Image, Space, Stack, Text } from '@mantine/core';
import { IconArrowDown, IconArrowLeft, IconArrowRight, IconArrowUp } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/secret')({
    component: RouteComponent,
})

function RouteComponent() {
    const themeColor = useCurrentBackground().color

    return <>
        <Space h="2000vh" />
        <Center>
            <Image src="/images/pink-laugh.gif" alt="pink laugh" style={{ imageRendering: "pixelated" }} />
        </Center>
        <Text className="undertale-font">
            YOU EXPECTED SOMETHING?
        </Text>
        <Stack>
            <Group justify="center">
                {Array.from({ length: 8 }).map((_, i) => (
                    <IconArrowDown key={i} />
                ))}
            </Group>
            <Group justify="center">
                <IconArrowRight /> <Anchor c={themeColor} href="https://youtu.be/JuiDQ9oBtDA?si=xZPhpAxko9gEAiBx" target="_blank">CLIK HEER!</Anchor> <IconArrowLeft />
            </Group>
            <Group justify="center">

                {Array.from({ length: 8 }).map((_, i) => (
                    <IconArrowUp key={i} />
                ))}
            </Group>
        </Stack>
    </>
}
