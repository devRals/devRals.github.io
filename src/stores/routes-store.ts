import { FileRouteTypes } from "@/routeTree.gen";
import { IconBallBasketball, IconBrandGithub, IconCode, IconDeviceDesktop, IconHome, IconNetwork, TablerIcon } from "@tabler/icons-react";
import { create } from "zustand";

interface Route {
    name: string,
    icon: TablerIcon,
    href: FileRouteTypes["to"],
}

const routes: Route[] = [
    {
        name: "Home",
        icon: IconHome,
        href: "/"
    },
    {
        name: "Skills",
        icon: IconCode,
        href: "/skills",
    },
    {
        name: "Interests/Hobies",
        icon: IconBallBasketball,
        href: "/interests"
    },
    {
        name: "Projects",
        icon: IconBrandGithub,
        href: "/projects"
    },
    {
        name: "System",
        icon: IconDeviceDesktop,
        href: "/sysfetch",
    },
    // {
    //     name: "Blogs",
    //     icon: IconBook,
    //     href: "/blogs",
    // },
    {
        name: "88x31",
        icon: IconNetwork,
        href: "/88x31"
    },
] as const

interface RoutesStore {
    routes: Route[],
    defineNewRoute: (r: Route) => void
}

export const useRoutes = create<RoutesStore>((set, get) => ({
    routes,
    defineNewRoute: (route) => set({ routes: [...get().routes, route] })
}))
