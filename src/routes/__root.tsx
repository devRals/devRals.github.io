import { createRootRoute, Outlet } from '@tanstack/react-router'
import Backgrounds2D from "@/components/backgrounds"
import { backgrounds, useBackground2D } from '@/stores/background-store'
import { Swapper } from '@/components/backgrounds/swapper';

const RootLayout = () => {
    const backgroundIndex = useBackground2D(s => s.current)

    return (
        <>
            <Outlet />
            <Swapper duration={250} content={
                <Backgrounds2D bg={backgrounds[backgroundIndex]} />
            } />
        </>
    )

}
export const Route = createRootRoute({
    component: RootLayout,
})
