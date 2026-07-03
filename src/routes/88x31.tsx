import { Anchor, Box, Divider, Group, Text } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/88x31')({
    component: RouteComponent,
})

const _88x31Buttons: React.ReactNode[] = [
    <a href="https://88x31.lol"><img src="https://88x31.lol/counter2.gif" alt="88x31 - Visitor counter" width="88" height="31" /></a>,
    //<a href="https://dimden.dev/"><img src="https://dimden.dev/services/images/88x31.gif" /></a>
    <img src="/images/88x31/powered-by-imagination.gif" height="31" />,
    <img src="/images/88x31/firefox_now.png" height="31" />,
    <img src="/images/88x31/spamton.gif" height="31" />,
    <iframe src="https://88x31.org/count/embed" width="88px" height="31px" style={{ border: "none;" }}></iframe>,
    <a href="https://neovim.io/"><img src="/images/88x31/made_with_neovim.png" height="31" /></a>,
    <img src="/images/88x31/miku_approved.png" height="31" />,
    <img src="/images/88x31/eniyi_gen_tr.gif" height="31" />,
]

function RouteComponent() {
    return <>
        <Group justify="center" gap={0}>
            {_88x31Buttons.map((button, i) =>
                <Box className="_88x31" key={i}>
                    {button}
                </Box>
            )}
        </Group>
        <Divider />
        <Text ta="center" c="dimmed" fz="sm">
            I need more buttons.
            I'm kinda new to this stuff.
            Please send me more <Anchor href="https://en.wikipedia.org/wiki/Inline_linking" fz="sm" c="dimmed" underline="always">hotlink</Anchor> avaliable buttons :3
        </Text>
    </>
}
