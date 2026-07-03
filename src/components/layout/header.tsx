import { useCurrentBackground } from "@/stores/background-store";
import { Avatar, Center, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { LanyardData, useLanyard } from "react-use-lanyard";

const userId = "718798893445283863"
export default () => {
    const { data } = useLanyard({ userId })
    const themeColor = useCurrentBackground().color

    const avatarLink = data && data.success && `https://cdn.discordapp.com/avatars/${userId}/${data.data.discord_user.avatar}.webp`

    return <>
        <Center>
            <Group>
                {avatarLink && <Tooltip position="left" label={<Text fz="h2">:3</Text>}>
                    <Avatar src={avatarLink} w={70} h={70} />
                </Tooltip>}
                <Stack gap={2}>
                    <Group gap={3}>
                        <Tooltip label="With smol 'd'">
                            <Title order={1} size="xl" fw={700} c={themeColor}>
                                devRals
                            </Title>
                        </Tooltip>
                        <Text c="dimmed" fz="xs">
                            (
                            <Text c="#fb0074" span>he</Text>
                            <Text span c="#b24d99">/</Text>
                            <Text c="#0135ab" span>him</Text>
                            )
                        </Text>
                    </Group>
                    <Group>
                        {data && data.success && (
                            <UserStatus status={data.data.discord_status} />
                        )}
                        <Text c="gray" fz="sm" span>UTC/GMT +3</Text>
                    </Group>
                </Stack>
            </Group>
        </Center>
    </>
}

const UserStatus = ({ status }: { status: LanyardData["discord_status"] }) => (
    statusBadges[status]
)

const statusBadges: Record<LanyardData["discord_status"], React.ReactNode> = {
    "dnd": <Text c="green" fw="bold">Online</Text>,
    "online": <Text c="green" fw="bold">Online</Text>,
    "idle": <Text c="yellow" fw="bold">AFK</Text>,
    "offline": <Text c="gray" fw="bold">Offline</Text>,
}
