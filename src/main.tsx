// # Router
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen'

const history = createMemoryHistory({ initialEntries: ["/"] })
const router = createRouter({ routeTree, history })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// # Query Client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

// # Theme
import { createTheme, MantineColor, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications"

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css"
import "@mantine/charts/styles.css"
import "mantine-flagpack/styles.css"
import "./style.css";

const theme = createTheme({
    primaryColor: "teal" as MantineColor,
    fontFamily: "renogare",
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
        Paper: {
            defaultProps: {
                withBorder: true,
                p: "xs"
            }
        },
        ActionIcon: {
            defaultProps: {
                variant: "subtle"
            }
        }
    },
});

// # Render
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} forceColorScheme="dark">
            <Notifications position="bottom-left" />
            <RouterProvider router={router} />
        </MantineProvider>
    </QueryClientProvider>
);
