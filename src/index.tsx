import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Center, createTheme, MantineProvider, Text } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./style.css";

const theme = createTheme({
    fontFamily: "undertale",
    colors: {
        dark: [
            "#C1C2C5",
            "#A6A7AB",
            "#909296",
            "#5c5f66",
            "#373A40",
            "#2C2E33",
            "#25262b",
            "#1A1B1E",
            "#141517",
            "#101113",
        ],
    },
    components: {
        Tooltip: {
            defaultProps: {
                color: "dark",
                events: {
                    touch: true,
                    hover: true,
                },
            },
        },
        Anchor: {
            defaultProps: {
                target: "_blank",
            },
        },
        Text: {
            defaultProps: {
                display: "inline",
            },
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider theme={theme} forceColorScheme="dark">
            <Center>
                <Text fz="h2">
                    New website design is work in progress :3
                </Text>
            </Center>
        </MantineProvider>
    </StrictMode>,
);
