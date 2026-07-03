import { Group, Image, Text, Tooltip } from "@mantine/core";
import { useEffect, useRef } from "react";

export const GODFUCKINGDAMMITKRISWHERETHEFUCKAREWE = () => (
    <Group>
        <Tooltip
            label={
                <Text fz="h2">GOD FUCKING DAMMIT KRIS! WHERE THE FUCK ARE WE!?</Text>
            }
            withArrow
            arrowSize={20}
        >
            <Image src="/images/susie-wtf.png" alt="WHERE THE FUCK ARE WE KRIS!?" w={60} />
        </Tooltip>
        <Tooltip label="..." withArrow arrowSize={10}>
            <Image src="/images/kris.png" alt="KRIS" w={30} />
        </Tooltip>
    </Group>
)

export const Strawberry = () => <Image src="/images/strawberry.gif" alt="bewwy :3" w={60} />

export const SUS = () => {
    // const sus = useRef<HTMLAudioElement>()
    // useEffect(() => {
    //     sus.current = new Audio("/audios/when-the-imposter-is-sus.mp3")
    // }, [])
    //
    return <Image src="/images/amogus.png" alt="SUS" w={40} />
}

export const YOUR_TAKING_TOO_LONG = () => {
    const yourTakingTooLong = useRef<HTMLAudioElement>()
    useEffect(() => {
        yourTakingTooLong.current = new Audio("/audios/youre-taking-too-long.mp3")
    }, [])

    return <img
        onClick={() => yourTakingTooLong.current?.play()}
        src="/images/jackenstein.gif"
        width="80%" height={70}
        alt="YOUR LONG"
        style={{ cursor: "pointer" }} />
}


export const Egg = () => {
    const sus = useRef<HTMLAudioElement>()
    useEffect(() => {
        sus.current = new Audio("/audios/deltarune-egg.mp3")
    }, [])

    return <Image src="/images/egg.png" alt="SUS" w={40} onClick={() => sus.current?.play()} style={{ cursor: "pointer" }} />
}
