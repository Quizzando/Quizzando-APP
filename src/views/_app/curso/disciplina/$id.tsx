import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/curso/disciplina/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/curso/disciplina/$id"!</div>
}
