import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/88x31')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/88x31"!</div>
}
