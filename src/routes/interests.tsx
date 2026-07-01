import { useCurrentBackground } from '@/stores/background-store';
import { Anchor, Group, Image, List, Text, Title, Tooltip } from '@mantine/core';
import { IconBrush, IconCube, IconHammer, IconMathXDivideY, IconMusic, TablerIcon } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/interests')({
    component: RouteComponent,
})

interface Interest {
    name: string,
    icon: TablerIcon | { src: string, size: number },
    tooltip?: string,
    link?: string
}

const gamesIPlay: Interest[] = [
    {
        name: "Celeste",
        icon: { src: "strawberry.gif", size: 30 },
        tooltip: "193 / 202 strawberries"
    },
    {
        name: "Minecraft",
        icon: { src: "minecraft.png", size: 30 },
        tooltip: "Usually PVP (Sword / Axe Main)"
    },
    {
        name: "Deltarune",
        icon: { size: 25, src: "deltarune.png" }
    },
    {
        name: "Osu!",
        icon: { size: 25, src: "osu.png" },
        tooltip: "Mania 5 digit"
    },
]

const hobbies: Interest[] = [
    {
        name: "Solving Rubik's Cube",
        icon: IconCube,
        tooltip: "My popular technique is CFOP (still relies on beginner method tho qwq) PB is 43.XX seconds"
    },
    {
        name: "Listening Music",
        icon: IconMusic,
    },
    {
        name: "Solving math problems",
        icon: IconMathXDivideY,
        tooltip: "Not advanced! I barely can solve calculus problems! I suck"
    },
    {
        name: "Drawing stupid stuff",
        icon: IconBrush,
        tooltip: "Those are awful and am too shy to show them here",
    },
    {
        name: "Breaking my tech tools",
        icon: IconHammer,
        tooltip: "Am sure am not the only one who does this right? ... RIGHT!?"
    }
]

const thingAmFanOf: Interest[] = [
    {
        name: "Undertale/Deltarune",
        icon: { src: "deltarune-soul.webp", size: 20 },
    },
    {
        name: "Among us (TV Series)",
        icon: { src: "amongus.png", size: 20 },
        link: "https://www.youtube.com/watch?v=gDq4g_jzmGg"
    },
    {
        name: "Unstable SMP",
        icon: { src: "hardcore-heart.webp", size: 20 },
        tooltip: "Popular POV is Wemmbu",
        link: "https://www.youtube.com/watch?v=s4Qm81fKfyk&list=PLFyNzacTRFYcuFZLfGWjer4zxBgqibdIF"
    },
    {
        name: "The Amazing Digital Circus",
        icon: { src: "pomni.png", size: 35 },
        link: "https://www.youtube.com/watch?v=HwAPLk_sQ3w&list=PLHovnlOusNLgvAbnxluXCVB3KLj8e4QB-",
    },
    {
        name: "Murder Drones",
        icon: { src: "uzi-s-battery.jpg", size: 30 },
        link: "https://www.youtube.com/watch?v=mImFz8mkaHo&list=PLHovnlOusNLiJz3sm0d5i2Evwa2LDLdrg&pp=0gcJCe4COCosWNin"
    },
    {
        name: "GameOVerse",
        icon: { src: "kaboodle.png", size: 30 },
        link: "https://www.youtube.com/watch?v=1jNk5tmjhpc&list=PLHovnlOusNLjUykpV3X-hI45o6n4haPGW",
    },
    {
        name: "Alan Becker",
        icon: { src: "alan-becker.png", size: 30 },
        link: "https://www.youtube.com/@alanbecker",
    },
    {
        name: "Interstellar",
        icon: { src: "endurance.png", size: 30 }
    },
]

const InterestRenderer = ({ interests }: { interests: Interest[] }) => {
    const themeColor = useCurrentBackground().color

    return (
        <List>
            {interests.map((int, i) => (
                <List.Item key={i}>
                    <Tooltip disabled={!int.tooltip} label={int.tooltip}>
                        <Group gap={5}>
                            {"src" in int.icon
                                ? <Image
                                    src={`/images/${int.icon.src}`}
                                    alt={int.name}
                                    w={int.icon.size}
                                    h={int.icon.size} />
                                : <Text c={themeColor}> <int.icon /> </Text>}

                            {int.link
                                ? <Anchor c="gray" href={int.link} target="_blank">
                                    <Text span>{int.name}</Text>
                                </Anchor>
                                : <Text>{int.name}</Text>
                            }
                        </Group>
                    </Tooltip>
                </List.Item>
            ))}
        </List>
    )
}

function RouteComponent() {
    return <>
        <List >
            <List.Item>
                <Title order={4}>Game I Play: </Title>
                <InterestRenderer interests={gamesIPlay} />
            </List.Item>

            <List.Item>
                <Title order={4}>Stupid stuff I do IRL: </Title>
                <InterestRenderer interests={hobbies} />
            </List.Item>
            <List.Item>
                <Title order={4}>Things am fan of: </Title>
                <InterestRenderer interests={thingAmFanOf} />
            </List.Item>
        </List>
    </>
}
