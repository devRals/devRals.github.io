import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sysfetch')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/sysfetch"!</div>
}
