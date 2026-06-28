import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/testing_page')({
    component: RouteComponent,
    pendingComponent: () => "loading..."
})

function RouteComponent() {
    return <div>Hello "/testing_page"!</div>
}
