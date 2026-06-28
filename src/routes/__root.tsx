import { createRootRoute, Outlet } from '@tanstack/react-router'
import Backgrounds2D from "@/components/backgrounds"
import { backgrounds, useBackground2D } from '@/components/backgrounds/store';

const RootLayout = () => {
    const backgroundIndex = useBackground2D(s => s.current)

    return (
        <>
            <Outlet />
            <Backgrounds2D bg={backgrounds[backgroundIndex]} />
        </>
    )

}
export const Route = createRootRoute({
    component: RootLayout,
})
