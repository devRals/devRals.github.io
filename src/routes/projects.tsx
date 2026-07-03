import { useCurrentBackground } from '@/stores/background-store';
import { useRoutes } from '@/stores/routes-store';
import { Accordion, Badge, Button, ButtonProps, Group, Image, Input, Stack, Text, Tooltip } from '@mantine/core';
import { IconBrandNodejs, IconBrandNpm, IconBrandReact, IconBrandRust, IconBrandTypescript, IconCode, IconDeviceDesktop, IconExternalLink, IconQuestionMark, IconSearch, IconTerminal2, IconWorldWww, TablerIcon } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/projects')({
    component: RouteComponent,
})

type ProjectStatus = "done" | "wip" | "archived" | "???"
type Tech = "TypeScript" | "NodeJS" | "Rust" | "React" | "???"
type ProjectType = "website" | "desktop" | "cli-tui" | "lib-rs" | "lib-ts" | "???"

interface Project {
    name: string,
    type: ProjectType,
    status: ProjectStatus,
    techs: Tech[],
    description: React.ReactNode,
    imageSrc?: string,
    buttons?: {
        sourceCode?: string,
        website?: string,
        action?: { label: string, fn: () => void }
    }
}

const statusBadges: Record<ProjectStatus, React.ReactNode> = {
    "archived": <Badge variant="light" color="dark">Archived</Badge>,
    "wip": <Tooltip label="Work in progress">
        <Badge variant="light" color="yellow">WIP</Badge>
    </Tooltip>,
    "???": <Badge variant="default">???</Badge>,
    done: <></>
}

const techIcons: Record<Tech, TablerIcon> = {
    NodeJS: IconBrandNodejs,
    React: IconBrandReact,
    Rust: IconBrandRust,
    TypeScript: IconBrandTypescript,
    "???": IconQuestionMark,
}

const projectTypeIcons: Record<ProjectType, React.ReactNode> = {
    "cli-tui": <Text><IconTerminal2 /> Command Line Interface</Text>,
    "desktop": <Text><IconDeviceDesktop /> Desktop Application</Text>,
    "lib-rs": <Text><IconBrandRust /> Rust Library</Text>,
    "lib-ts": <Text><IconBrandNpm /> JavaScript/TypeScript Library</Text>,
    "website": <Text><IconWorldWww /> Website</Text>,
    "???": <Text><IconQuestionMark /> ???</Text>,
}

const projects: Project[] = [
    {
        name: "ralix",
        type: "cli-tui",
        techs: ["Rust"],
        status: "done",
        description: "A function based interpreter with C similar syntax. It's really broken",
        buttons: { website: "https://devrals.github.io/Ralix/", sourceCode: "https://github.com/devRals/Ralix/" }
    },
    {
        name: "rals-renderer",
        type: "lib-rs",
        techs: ["Rust"],
        status: "archived",
        description: "A project that helped me learn the opengl basics",
        buttons: { sourceCode: "https://github.com/devRals/rals-renderer/" },
    },
    {
        name: "devRals.github.io",
        type: "website",
        status: "done",
        "description": "It's literally this website",
        techs: ["React", "TypeScript"],
        buttons: { sourceCode: "https://github.com/devRals/devRals.github.io/" },
    }
]


const TechsRenderer = ({ techs }: { techs: Tech[] }) => {
    const themeColor = useCurrentBackground().color

    return <Group gap={1} c={themeColor}>
        {techs.map((t, i) => {
            const Icon = techIcons[t]
            return <Tooltip key={i + t} label={t}>
                <Icon size={25} />
            </Tooltip>
        })}
    </Group>
}

const ProjectRenderer = ({ project }: { project: Project }) => {
    const themeColor = useCurrentBackground().color

    const buttonProps: ButtonProps = {
        fullWidth: true,
        color: themeColor,
        variant: "outline",
    }

    return <Accordion.Item value={project.name} bg="transparent" bd="1px solid dark.5">
        <Accordion.Control icon={<TechsRenderer techs={project.techs} />}>
            <Group gap={5}>
                {project.name}
                {statusBadges[project.status]}
            </Group>
        </Accordion.Control>
        <Accordion.Panel>
            <Stack>
                {project.imageSrc && <Image src={project.imageSrc} alt={`${project.name}-image`} />}
                <Group>
                    <Text c={themeColor}>Type:</Text> {projectTypeIcons[project.type]}
                </Group>
                {typeof project.description === "string" ? <Text fz="sm">{project.description}</Text> : project.description}
                {project.buttons &&
                    <Button.Group>
                        {project.buttons.website && <Button {...buttonProps} rightSection={<IconExternalLink />}>Website</Button>}
                        {project.buttons.sourceCode && <Button {...buttonProps} rightSection={<IconCode />}>Source Code</Button>}
                        {project.buttons.action && <Button {...buttonProps} onClick={project.buttons.action.fn}>{project.buttons.action.label}</Button>}
                    </Button.Group>}
            </Stack>
        </Accordion.Panel>
    </Accordion.Item>
}

function RouteComponent() {
    const themeColor = useCurrentBackground().color
    const [search, setSearch] = useState("")
    const [filteredProjects, setFilteredProject] = useState<Project[]>(projects)
    const defineNewRoute = useRoutes(s => s.defineNewRoute)


    const SECRET_SEARCH_STRING = "1225"
    const SECRET_PROJECT: Project = {
        name: "???",
        status: "???",
        techs: ["???"],
        type: "???",
        description: <Stack className="undertale-font">
            <Text className="undertale-font" span>IT SEEMS YOU'VE ENCOUNTERED SOMETHING YOU SHOULD NOT SEE</Text>
            <Text className="undertale-font" span>BUT YOU DON'T SEEM SATISFIED</Text>
            <Text className="undertale-font" span>WILL YOU PERSIST?</Text>
        </Stack>,
        buttons: {
            action: {
                label: "???",
                fn: () => defineNewRoute({
                    name: "???",
                    icon: IconQuestionMark,
                    href: "/secret"
                })
            }
        }
    }

    const handleSearch = (searchValue: string) => {
        setSearch(searchValue)
        const normalizedSearch = searchValue.toLowerCase()

        if (!normalizedSearch) {
            setFilteredProject(projects)
            return
        }

        if (SECRET_SEARCH_STRING.toLowerCase() === normalizedSearch) {
            setFilteredProject([SECRET_PROJECT])
            return
        }

        const filtered = projects.filter(p => {
            const desc = p.description ? p.description.toString() : ""
            const searchString = p.name.concat(p.status, p.techs.join(""), p.type, desc).toLowerCase()
            return searchString.includes(normalizedSearch)
        })
        setFilteredProject(filtered)
    }

    return <>
        <Input
            value={search}
            color={themeColor}
            onChange={(e) => handleSearch(e.currentTarget.value)}
            leftSection={<IconSearch />}
            placeholder="Search...?"
            autoFocus={true}
            rightSection={
                search ? (
                    <Input.ClearButton
                        aria-label="Clear input"
                        onClick={() => handleSearch('')}
                    />
                ) : null
            }
        />

        <Accordion variant="separated" chevronPosition="left">
            {filteredProjects.map((p, i) => (
                <ProjectRenderer project={p} key={p.name + i} />
            ))}
        </Accordion>
    </>
}
