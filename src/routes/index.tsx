import Socials from '@/components/layout/socials';
import { useCurrentBackground } from '@/stores/background-store';
import { Group, Stack, Text, Tooltip } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router'
import { TRFlag } from "mantine-flagpack"

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const themeColor = useCurrentBackground().color

    return (
        <>
            <Text>
                Howdy and welcome to my silly website! :3
                I'm a coder or something, yeah!
            </Text>
            <Text>
                I LOVE open source
            </Text>
            <Group gap={4}>
                <Text>
                    I'm from
                </Text>
                <Text c="red" span> Turkiye </Text>{"/"}
                <Tooltip label="Fucking hate it here">
                    <Text c="cyan" display="inline">Isparta</Text>
                </Tooltip>
                <Tooltip label="UTC/GMT +3">
                    <TRFlag w={30} display="inline" size={30} />
                </Tooltip>
                <Text c="dimmed" span fz="xs">
                    (Please don't airstrike my house)
                </Text>
            </Group>
            {/* <Text span> */}
            {/*     Meaning of my name is developer Ralsei. Yeah... I know it sounds stupid. */}
            {/*     That's why it's "devRals". */}
            {/* </Text> */}
            <Text span>
                Why the <Text span c={themeColor} fw="bolder">'d'</Text> has to be lowercase?
                No reason. I like it that way :D
            </Text>
            <Stack gap={1}>
                <Group>
                    <Text span>
                        Here are my accounts:
                    </Text>
                    <Socials />
                </Group>
                <Text c="dimmed" fz="xs" span>
                    (Please talk to me. Am lonely :c)
                </Text>
            </Stack>
        </>
    )
}
