import { useCurrentBackground } from "@/stores/background-store";
import { Divider, Group, Image, Indicator, Stack, Text, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { LanyardResponse, Assets, useLanyard } from "react-use-lanyard";

const userId = "718798893445283863"
export default () => {
    const { isLoading, data } = useLanyard({ userId })

    if (data && data.success && data.data.discord_status === "offline") return null

    return <>
        {isLoading || !data
            ? <Text c="yellow" ta="center">Status Loading...</Text>
            : <StatusData data={data} />}
    </>
}

const StatusData = ({ data: { data, error, success } }: { data: LanyardResponse }) => {
    const themeColor = useCurrentBackground().color

    if (!success || error) return null

    for (const act of data.activities) {
        if (act.name === "Custom Status") continue

        return <>
            <Divider label="Status" />
            <Group w="100%">
                {act.assets && <StatusImages assets={act.assets} />}
                <Stack gap={0} w="70%">
                    <Text c={themeColor} span truncate="end">{" "}{act.name}</Text>
                    {act.details && <Text c="dimmed" fz="sm" span truncate="end">{act.details}</Text>}
                    <Text c="dimmed" fz="sm" span truncate="end">{act.state}</Text>
                </Stack>

            </Group>

        </>
    }

    return null
}

const DISCORD_MEDIA_API = "https://media.discordapp.net/"
const StatusImages = ({ assets }: { assets: Assets }) => {
    const [largeImageUrl, setLargeImageUrl] = useState<string | null>(null)
    const [smallImageUrl, setSmallImageUrl] = useState<string | null>(null)

    useEffect(() => {
        if (assets.large_image && assets.large_image.startsWith("mp:")) {
            const largeImageUrl = assets.large_image.replace("mp:", DISCORD_MEDIA_API)
            setLargeImageUrl(largeImageUrl)
        } else if (!assets.large_image) setLargeImageUrl(null)

        if (assets.small_image && assets.small_image.startsWith("mp:")) {
            const smallImageUrl = assets.small_image.replace("mp:", DISCORD_MEDIA_API)
            setSmallImageUrl(smallImageUrl)
        } else if (!assets.small_image) setSmallImageUrl(null)
    }, [assets])

    return <Indicator disabled={!smallImageUrl} size={0} position="bottom-end" label={<Tooltip
        disabled={!assets.small_text}
        label={assets.small_text}>
        <Image src={smallImageUrl} w={25} h={25} radius="sm" />
    </Tooltip>} >
        {largeImageUrl &&
            <Tooltip label={assets.large_text} disabled={!assets.large_text}>
                <Image radius="sm" w={65} h={65} src={largeImageUrl} />
            </Tooltip>
        }
    </Indicator>
}
