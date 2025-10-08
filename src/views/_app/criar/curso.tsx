import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/criar/curso')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/criar/curso"!</div>
}
