import CircularGallery from '@/components/CircularGallery'
import { Button } from '@/components/ui/button'
import { MOCK_COURSES } from '@/constants/mock'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/curso/$id')({
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
      <Link to={'/'}>
        <Button variant={'link'}>Voltar</Button>
      </Link>
      <h1>Este é o curso de {course.name}</h1>
      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery
          bend={3}
          textColor="#00000"
          borderRadius={0.05}
          scrollEase={0.05}
        />
      </div>
    </div>
  )
}
