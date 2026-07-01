import { useCurrentBackground } from "@/stores/background-store";
import { ActionIcon, Center, Group, Tooltip } from "@mantine/core";
import { IconBallBasketball, IconBook, IconBrandGithub, IconCode, IconDeviceDesktop, IconHome, IconNetwork } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { FileRouteTypes } from "@/routeTree.gen"

interface NavigationButton {
    name: string,
    icon: React.ReactNode,
    href: FileRouteTypes["to"]
}

const buttons: NavigationButton[] = [
    {
        name: "Home",
        icon: <IconHome />,
        href: "/"
    },
    {
        name: "Interests/Hobies",
        icon: <IconBallBasketball />,
        href: "/interests"
    },
    {
        name: "Skills",
        icon: <IconCode />,
        href: "/tech",
    },
    {
        name: "Projects",
        icon: <IconBrandGithub />,
        href: "/projects"
    },
    {
        name: "Neofetch",
        icon: <IconDeviceDesktop />,
        href: "/sysfetch",
    },
    {
        name: "Blogs",
        icon: <IconBook />,
        href: "/blogs"
    },
    {
        name: "88x31",
        icon: <IconNetwork />,
        href: "/88x31"
    }
]

export default () => {
    const themeColor = useCurrentBackground().color

    return <Center>
        <Group justify="space-evenly">
            {buttons.map((b, i) =>
                <Tooltip label={b.name} key={i}>
                    <Link to={b.href}>
                        <ActionIcon color={themeColor} c={themeColor} variant="light">
                            {b.icon}
                        </ActionIcon>
                    </Link>
                </Tooltip>
            )}
        </Group>
    </Center>
}
