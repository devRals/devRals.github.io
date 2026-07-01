import { Anchor, Button, Collapse, Divider, Stack, Text } from "@mantine/core";
import { GODFUCKINGDAMMITKRISWHERETHEFUCKAREWE, Strawberry, SUS, YOUR_TAKING_TOO_LONG } from "../funny";
import { chooseRand } from "@devrals/math";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDownFilled, IconChevronUp } from "@tabler/icons-react";

const funnyComponents = [
    <GODFUCKINGDAMMITKRISWHERETHEFUCKAREWE />,
    <SUS />,
    <Strawberry />,
    <YOUR_TAKING_TOO_LONG />
]

export default () => {
    const [component, set] = useState<React.ReactNode | null>(null)
    const [expanded, { toggle }] = useDisclosure(false)

    useEffect(() => {
        set(chooseRand(funnyComponents))
    }, [])

    return <Stack align="center">
        <Button variant="transparent" onClick={toggle}>
            {expanded ? <IconChevronUp /> : <IconChevronDownFilled />}
        </Button>
        <Collapse expanded={expanded}>
            {component}
        </Collapse>
        <Divider />
        <Text fz="xs" c="dimmed">Website design inspired from old design of <Anchor c="dimmed" fz="xs" href="https://deniz.blue/">deniz.blue</Anchor></Text>
    </Stack>
}
