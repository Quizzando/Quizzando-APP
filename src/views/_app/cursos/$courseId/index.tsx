'use client'

import { createFileRoute } from '@tanstack/react-router'
import { Clock, PencilLine, Star, Users } from 'lucide-react'
import { CourseDetailsSkeleton } from '../-components/course-details-skeleton'
import { useQuery } from '@tanstack/react-query'
import { courseService } from '@/models/services/CourseService'
import { COURSES_KEY } from '@/constants/keys'

export const Route = createFileRoute('/_app/cursos/$courseId/')({
  pendingComponent: CourseDetailsSkeleton,
  component: RouteComponent,
})

function RouteComponent() {
  const { courseId } = Route.useParams()
  const { data: course, isPending } = useQuery({
    queryKey: [COURSES_KEY, courseId],
    queryFn: () => courseService.getCourseById(courseId),
  })

  if (isPending || !course) return <CourseDetailsSkeleton />

  return (
    <div className="flex flex-col">
      {/* === SEÇÃO DESCRITIVA ===  */}
      <section className="w-full flex flex-col md:flex-row md:items-start gap-6 px-4 sm:px-6 py-4">
        <div className="relative w-full md:w-1/2 flex-shrink-0">
          <img
            src={course.backgroundImage || '/placeholder.svg'}
            alt={course.courseName}
            className="rounded-xl w-full h-auto max-h-[400px] md:max-h-[500px] object-cover"
          />
          <span
            className="absolute top-2 right-2 bg-primary border-2 border-accent 
          text-primary-foreground px-4 py-1 text-xs rounded-full"
          >
            Ensino {course.category === 0 ? 'Técnico' : 'Médio'}
          </span>
        </div>
        <div className="flex flex-col w-full md:w-1/2 space-y-4 md:space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              {course.courseName}
            </h3>
            <div className="flex items-center mt-1">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
              Visão Geral
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card p-6 rounded-lg flex flex-col items-center space-y-2 shadow-sm">
                <Users className="h-5 w-5 text-secondary fill-secondary/20" />
                <p className="w-full text-center text-sm">
                  <span className="font-semibold text-primary">
                    {' '}
                    {/* {Math.floor(Math.random() * 100 * course.disciplines.length)} */}
                  </span>{' '}
                  Respondentes
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg flex flex-col items-center space-y-2 shadow-sm">
                <Clock className="h-5 w-5 text-secondary fill-secondary/20" />
                <p className="w-full text-center text-sm">
                  <span className="font-semibold text-primary">
                    {/* ~{course.disciplines.length * 5} */}
                  </span>
                  hrs de conteúdo
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg flex flex-col items-center space-y-2 shadow-sm">
                <PencilLine className="h-5 w-5 text-secondary fill-secondary/20" />
                <p className="w-full text-center text-sm">
                  <span className="font-semibold text-primary">
                    {course.rating}
                  </span>{' '}
                  Disciplinas cadastradas
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground text-justify text-sm sm:text-base">
              {course.description}
            </p>
          </div>
        </div>
      </section>

      {/* === SEÇÃO DE DISCIPLINAS DO CURSO === */}
      <section className="w-full px-4 sm:px-6 py-4">
        <div className="mb-8">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Disciplinas do Curso
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Explore todas as disciplinas que compõem este curso
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* {course.disciplines.map((discipline) => (
            <DisciplineCard discipline={discipline} />
          ))} */}
        </div>
      </section>
    </div>
  )
}
