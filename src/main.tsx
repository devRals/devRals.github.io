// # Router
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// # Theme
import { createTheme, MantineColor, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications"

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css"
import "./style.css";

const theme = createTheme({
    primaryColor: "teal" as MantineColor,
    fontFamily: "undertale",
    defaultRadius: "sm",
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

// # Render
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
    <MantineProvider theme={theme} forceColorScheme="dark">
        <Notifications position="bottom-left" />
        <RouterProvider router={router} />
    </MantineProvider>
);
