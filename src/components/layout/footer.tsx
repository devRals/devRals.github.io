import { Anchor, Button, Collapse, Divider, Stack, Text } from "@mantine/core";
import { GODFUCKINGDAMMITKRISWHERETHEFUCKAREWE, Strawberry, SUS, YOUR_TAKING_TOO_LONG, Egg } from "../funny";
import { chooseRand } from "@devrals/math";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDownFilled, IconChevronUp } from "@tabler/icons-react";
import { useCurrentBackground } from "@/stores/background-store";

const funnyComponents = [
    <GODFUCKINGDAMMITKRISWHERETHEFUCKAREWE />,
    <SUS />,
    <Strawberry />,
    <YOUR_TAKING_TOO_LONG />,
    <Egg />
]

export default () => {
    const [component, set] = useState<React.ReactNode | null>(null)
    const [expanded, { toggle }] = useDisclosure(false)
    const themeColor = useCurrentBackground().color

    useEffect(() => {
        set(chooseRand(funnyComponents))
    }, [])

    return <Stack align="center" w="100%">
        <Text fz="xs" c="dimmed">Website design inspired from old design of <Anchor c={themeColor} fz="xs" href="https://deniz.blue/">deniz.blue</Anchor></Text>
        <Button variant="transparent" onClick={toggle}>
            {expanded ? <IconChevronUp /> : <IconChevronDownFilled />}
        </Button>
        <Collapse expanded={expanded} w="100%">
            {component}
        </Collapse>
        <Divider />
    </Stack>
}
