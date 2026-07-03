import { createFileRoute } from '@tanstack/react-router'
import { Heatmap } from "@mantine/charts"
import { useCurrentBackground } from '@/stores/background-store';
import { Anchor, Center, Divider, Group, Loader, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IconBrandMantine, IconBrandNetflix, IconBrandNodejs, IconBrandReact, IconBrandRust, IconBrandTypescript, IconBrandUbuntu, IconGitBranch, IconSnowflake, TablerIcon } from '@tabler/icons-react';
import { TRFlag, GBFlag } from "mantine-flagpack"

type ContributionLevel = 0 | 1 | 2 | 3 | 4
type Contribution = {
    date: string,
    count: number,
    level: ContributionLevel
}

type FormatedContributions = Record<string, ContributionLevel>

type ContributionsData = {
    total: Record<string, number>, // [K: Year]: Contributions Amount
    contributions: Contribution[]
}

function reFormatContributionsData(data: ContributionsData): FormatedContributions {
    const formatedData: FormatedContributions = {}
    for (const entry of data.contributions) formatedData[entry.date] = entry.level
    return formatedData
}

const ErrorComponent = () => {
    return <>
        <Title order={3}>Whoops!</Title>
        <Text>It seems I failed to fetch my github stats</Text>
        <Text>That means you have to rely on my static values for a while :3</Text>
        <Divider />
        <DummyData />
    </>
}

export const Route = createFileRoute('/skills')({
    component: RouteComponent,
    errorComponent: ErrorComponent,
    pendingComponent: () => <Center>
        <Loader type="bars" color={useCurrentBackground().color} />
    </Center>,

    loader: async () => {
        const [contributionsData] = await Promise.all([
            fetch("https://github-contributions-api.jogruber.de/v4/devRals").then(r => r.json()),
        ])

        return {
            contributions: reFormatContributionsData(contributionsData)
        }
    },
})

function RouteComponent() {
    const { contributions } = Route.useLoaderData()
    const themeColor = useCurrentBackground().color

    return <>
        <DummyData />
        <Title order={5}>Github Activity</Title>
        <Heatmap
            w="100%"
            rectRadius={0}
            gap={1}
            data={contributions}
            rectSize={6} colors={[
                `var(--mantine-color-gray-9)`,
                `var(--mantine-color-${themeColor}-9)`,
                `var(--mantine-color-${themeColor}-6)`,
                `var(--mantine-color-${themeColor}-3)`
            ]}
        />
    </>
}

interface Skill {
    name: string,
    icon: TablerIcon,
    href?: string
}

const techsIUse: Skill[] = [
    {
        name: "TypeScript/Javascript",
        icon: IconBrandTypescript,
    },
    {
        name: "Rust",
        icon: IconBrandRust
    },
    {
        name: "React",
        icon: IconBrandReact,
    },
    {
        name: "NodeJS",
        icon: IconBrandNodejs
    },
    {
        name: "Github/Git",
        icon: IconGitBranch,
    },
    {
        name: "Nix / Nix Flakes",
        icon: IconSnowflake,
        href: "https://nixos.org/"
    },
    {
        name: "Mantine UI Library",
        icon: IconBrandMantine,
        href: "https://mantine.dev/"
    },
    {
        name: "Neovim",
        icon: IconBrandNetflix, // :D
        href: "https://neovim.io"
    },
    {
        name: "Ubuntu/Debian/Arch Linux",
        icon: IconBrandUbuntu,
    }
]

const DummyData = () => {
    const themeColor = useCurrentBackground().color
    return <>
        <Title order={5}>Techs I use mostly</Title>
        <Group justify="center" wrap="wrap">
            {techsIUse.map((tech, i) => (
                <Tooltip label={tech.name} key={i}>
                    {tech.href
                        ? <Anchor href={tech.href} c={themeColor}><tech.icon /></Anchor>
                        : <Text c={themeColor}> <tech.icon /></Text>
                    }
                </Tooltip>
            ))}
        </Group>
        <Divider />
        <Stack>
            <Title order={5}>Languages I Can Speak </Title>
            <Group>
                <TRFlag size={30} /> <Text c={themeColor} span>Turkish: </Text> <Text span>Native</Text>
            </Group>
            <Group>
                <GBFlag size={30} /> <Text c={themeColor} span>English: </Text> <Text span> B2-ish</Text>
            </Group>

        </Stack>
    </>
}
