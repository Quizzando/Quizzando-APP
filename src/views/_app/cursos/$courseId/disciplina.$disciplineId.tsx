import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/cursos/$courseId/disciplina/$disciplineId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="max-w-5xl min-h-screen mx-auto flex flex-col items-center justify-start px-6 py-12 space-y-6">
      Hello "/_app/curso/$id/disciplina/$id"!
    </div>
  )
}
