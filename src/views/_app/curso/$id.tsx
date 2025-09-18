import CircularGallery from '@/components/CircularGallery'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MOCK_COURSES } from '@/constants/mock'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock, PencilLine, Star, Users } from 'lucide-react'

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
      <div>
        <img src={course.backgroundImage} alt={course.name} />
        <span>{course.category}</span>
      </div>
      <div>
        <h3>{course.name}</h3>
        <div className="flex items-center">
          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
          {course.rating}
        </div>

        <h3>Visão Geral</h3>
        <Card>
          <CardContent>
            <div className='flex items-center space-x-4'>
              <Users className='h-10 w-10' />
              {Math.floor(Math.random() * 100 * course.disciplines.length)} Respondentes
            </div>
            <div className='flex items-center space-x-4'>
              <Clock className='h-10 w-10' />
              {course.disciplines.length * 5}hrs de Duração
            </div>
            <div className='flex items-center space-x-4'>
              <PencilLine className='h-10 w-10' />
              {course.rating} Disciplinas cadastradas
            </div>
          </CardContent>
        </Card>

        <div>
          <h3>Descrição</h3>
          <p>{course.description}</p>
        </div>
      </div>
    </div>
  )
}


/*
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
*/ 