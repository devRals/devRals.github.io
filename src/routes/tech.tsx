import { createFileRoute } from '@tanstack/react-router'
import { Heatmap } from "@mantine/charts"
import { useCurrentBackground } from '@/stores/background-store';
import { Anchor, Center, Divider, Group, Loader, Text, Title, Tooltip } from '@mantine/core';
import { IconBrandMantine, IconBrandNodejs, IconBrandReact, IconBrandRust, IconBrandTypescript, IconGitBranch, IconLetterN, TablerIcon } from '@tabler/icons-react';

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

export const Route = createFileRoute('/tech')({
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
        <DummyData />
    </>
}

interface Language {
    name: string,
    icon: TablerIcon,
    href?: string
}

const languagesIUse: Language[] = [
    {
        name: "TypeScript/Javascript",
        icon: IconBrandTypescript,
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
        name: "Mantine UI Library",
        icon: IconBrandMantine,
        href: "https://mantine.dev/"
    },
    {
        name: "Rust",
        icon: IconBrandRust
    },
    {
        name: "Neovim",
        icon: IconLetterN,
        href: "https://neovim.io"
    }
]

const DummyData = () => {
    const themeColor = useCurrentBackground().color
    return <>
        <Title order={5}>Techs I use mostly</Title>
        <Group justify="center">
            {languagesIUse.map((lang, i) => (
                <Tooltip label={lang.name} key={i}>
                    {lang.href
                        ? <Anchor href={lang.href} c={themeColor}><lang.icon /></Anchor>
                        : <Text c={themeColor}> <lang.icon /></Text>
                    }
                </Tooltip>
            ))}
        </Group>
    </>
}
