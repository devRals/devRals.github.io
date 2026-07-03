import { useCurrentBackground } from "@/stores/background-store";
import { ActionIcon, ActionIconProps, Anchor, Center, Group, Tooltip } from "@mantine/core";
import { IconBrandDiscord, IconBrandGithub, IconPlaylist } from "@tabler/icons-react";

interface SocialButton {
    name: string,
    icon: React.ReactNode
}

interface InteractiveButton extends SocialButton {
    type: "interactive",
    onClick: () => void
}

interface LinkButton extends SocialButton {
    type: "link",
    href: string
}

const buttons: (InteractiveButton | LinkButton)[] = [
    {
        type: "link",
        name: "Github",
        href: "https://github.com/devRals",
        icon: <IconBrandGithub />
    },
    {
        type: "link",
        name: "Discord",
        href: "https://discord.com/users/718798893445283863",
        icon: <IconBrandDiscord />
    },
    // {
    //     type: "link",
    //     name: "Youtube",
    //     href: "https://www.youtube.com/@devrals",
    //     icon: <IconBrandYoutube />
    // },
    {
        type: "link",
        name: "My Youtube Playlist",
        href: "https://music.youtube.com/playlist?list=PLBRC-TQE9D2EP1RI8ro5IF02ofLoGbZ86&si=ZlL7p3doSNvhxhTP",
        icon: <IconPlaylist />
    },
    // {
    //     type: "link",
    //     name: "NameMC (Please don't mind the skin :3)",
    //     href: "https://namemc.com/profile/devRals",
    //     icon: <IconCube />
    // }
]

export default () => {
    const themeColor = useCurrentBackground().color

    const buttonProps: ActionIconProps = {
        variant: "light",
        c: themeColor,
        color: themeColor
    }

    return <Center>
        <Group>
            {buttons.map((b, i) => (
                <Tooltip key={i} label={b.name}>
                    {b.type === "link"
                        ? <Anchor href={b.href} target="_blank">
                            <ActionIcon {...buttonProps}>
                                {b.icon}
                            </ActionIcon>
                        </Anchor>
                        : <ActionIcon {...buttonProps} onClick={b.onClick}>
                            {b.icon}
                        </ActionIcon>
                    }
                </Tooltip>
            ))}
        </Group>
    </Center>

}

