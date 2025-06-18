import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
// import App from "./App";
import { MusicPlayer, MusicPlayerProvider } from "@/components/musicPlayer";
import { SecretProvider } from "./components/context/secret/SecretContext";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import "./i18n";
import { router } from "./router";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-flagpack/styles.css";
import "./style.css";
import { StatusProvider } from "./components/context/status";
import { PageProvider } from "./components/context/page";

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
            <SecretProvider secret={false}>
                <MusicPlayerProvider>
                    <PageProvider>
                        <StatusProvider>
                            <Notifications position="top-center" />
                            <RouterProvider router={router} />
                            <MusicPlayer />
                        </StatusProvider>
                    </PageProvider>
                </MusicPlayerProvider>
            </SecretProvider>
        </MantineProvider>
    </StrictMode>,
);
