import { Button } from '@/components/ui/button'
import { MOCK_COURSES } from '@/constants/mock'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/course/$id')({
  loader: async ({ params }) => {
    // ... lógica de fetch do curso
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const course = MOCK_COURSES.find((c) => c.id === id)!

  return (
    <div>
      <Link to={'/dashboard'}>
        <Button variant={'link'}>Voltar</Button>
      </Link>
      <h1>Este é o curso de {course.name}</h1>
    </div>
  )
}
