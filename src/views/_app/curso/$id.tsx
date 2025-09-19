import { Card, CardContent } from '@/components/ui/card'
import { MOCK_COURSES } from '@/constants/mock'
import { createFileRoute } from '@tanstack/react-router'
import { DisciplineCard } from './-components/discipline-card'
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
    <div className='flex flex-col'>
      {/* === SEÇÃO DESCRITIVA ===  */}
      <section className='w-full flex flex-col md:flex-row items-center md:items-start space-x-6 px-6 py-4'>
      <div className='relative max-w-1/2'>
        <img src={course.backgroundImage} alt={course.name} className='rounded-xl' />
        <span 
          className='absolute top-2 right-2 bg-primary border-2 border-accent 
          text-primary-foreground px-4 py-1 text-xs rounded-full'>
            Ensino {course.category === 'mtec' ? 'Técnico' :'Médio'}
        </span>
      </div>
      <div className='flex flex-col max-w-1/2 space-y-6'>
        <div>
        <h3 className='text-4xl font-semibold'>{course.name}</h3>
        <div className="flex items-center">
          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
          {course.rating}
        </div>
        </div>

        <h3 className='text-xl font-semibold'>Visão Geral</h3>
        <Card className='text-muted-foreground'>
          <CardContent className='flex flex-col md:flex-row flex-wrap items-center justify-center space-x-6 space-y-4'>
            <div className='flex flex-col items-center justify-center'>
              <Users className='h-5 w-5 text-secondary fill-secondary/20' />
             <p>
             <span className='font-semibold text-primary'> {Math.floor(Math.random() * 100 * course.disciplines.length)}</span> Respondentes
             </p>
            </div>
            <div className='flex flex-col items-center justify-center '>
              <Clock className='h-5 w-5 text-secondary fill-secondary/20' />
           <p>
           <span className='font-semibold text-primary'>~{course.disciplines.length * 5}</span>hrs de conteúdo
           </p>
            </div>
            <div className='flex flex-col items-center justify-center '>
              <PencilLine className='h-5 w-5 text-secondary fill-secondary/20' />
              <p>
                <span className='font-semibold text-primary'>
              {course.rating} 
 
                </span>
              {' '} Disciplinas cadastradas
              </p>
            </div>
          </CardContent>
        </Card>

        <div >
          <h3 className='text-xl font-semibold'>Descrição</h3>
          <p className='text-muted-foreground text-justify'>{course.description}</p>
        </div>
      </div>
    </section>

    {/* === SEÇÃO DE DISCIPLINAS DO CURSO === */}
    <section className='w-full px-6 py-4'>
    <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">Disciplinas do Curso</h2>
            <p className="text-muted-foreground">Explore todas as disciplinas que compõem este curso</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {course.disciplines.map((discipline) => (
              <DisciplineCard discipline={discipline}/>
            ))}
      </div>
    </section>
    </div>
  )
}