import { Image, Tooltip } from "@mantine/core";
import { useHover } from "@mantine/hooks";

const Spamton = () => {
    const { ref, hovered } = useHover();
    return (
        <Tooltip
            multiline
            label="Hello [TRADER]. What do you [TALKING IN BRAIN] about? WANNA [CREATE] AN UNFORGETTABLE [D-DEAL] FOR [US]?\n Go write [THE SHORTCUT] of [sussie baka] in the [CREATION LOOKUP]"
            position="top-end"
            fz={"h4"}
            className="spamton-tooltip"
        >
            <Image
                src="/images/sprites/spamton.png"
                style={{
                    cursor: "pointer",
                    transform: "rotate(-90deg)",
                    transition: "all .2s ease",
                }}
                alt="Spamton Laughing"
                pos={"fixed"}
                w={30}
                top={80}
                right={!hovered ? -20 : 0}
                ref={ref}
            />
        </Tooltip>
    );
};

export default Spamton;
