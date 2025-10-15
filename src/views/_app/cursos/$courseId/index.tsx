'use client'

import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock, PencilLine, Star, Users } from 'lucide-react'
import { CourseDetailsSkeleton } from '../-components/course-details-skeleton'
import { useQuery } from '@tanstack/react-query'
import { courseService } from '@/models/services/CourseService'
import { COURSES_KEY } from '@/constants/keys'
import { DisciplineCard } from '../-components/discipline-card'
import { disciplineService } from '@/models/services/DisciplineService'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import type { Discipline } from '@/@types'

export const Route = createFileRoute('/_app/cursos/$courseId/')({
  pendingComponent: CourseDetailsSkeleton,
  component: RouteComponent,
})

function RouteComponent() {
  const { courseId } = Route.useParams()
  const {
    data: course,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: [COURSES_KEY, courseId],
    queryFn: () => courseService.getCourseById(courseId),
  })

  const [disciplines, setDisciplines] = useState<Discipline[]>([])
  useEffect(() => {
    const fetchDisciplines = async () => {
      if (!course?.disciplines?.length) return

      try {
        const response = await Promise.all(
          course.disciplines.map((id) =>
            disciplineService.getDisciplineById(id),
          ),
        )

        setDisciplines(response.filter(Boolean) as Discipline[])
      } catch (error) {
        console.error('Error fetching disciplines:', error)
      }
    }

    fetchDisciplines()
  }, [courseId, course])

  if (isPending) return <CourseDetailsSkeleton />

  if (error || !course)
    return (
      <div>
        <p>Erro ao buscar cursos...</p>
        <Button onClick={() => refetch()}>Tentar Novamente</Button>
      </div>
    )

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
              {course.rating?.toFixed(1)}
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
                    {Math.floor(
                      Math.random() * 100 * course.disciplines.length,
                    )}
                  </span>{' '}
                  Respondentes
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg flex flex-col items-center space-y-2 shadow-sm">
                <Clock className="h-5 w-5 text-secondary fill-secondary/20" />
                <p className="w-full text-center text-sm">
                  <span className="font-semibold text-primary">
                    ~{course.disciplines.length * 5}
                  </span>
                  hrs de conteúdo
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg flex flex-col items-center space-y-2 shadow-sm">
                <PencilLine className="h-5 w-5 text-secondary fill-secondary/20" />
                <p className="w-full text-center text-sm">
                  <span className="font-semibold text-primary">
                    {course.disciplines.length}
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

        {!isPending && disciplines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {disciplines.map((discipline) => (
              <DisciplineCard discipline={discipline} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 my-10 space-y-6">
            <p className="text-center">
              Hmmm, Parece que nenhuma disciplina foi cadastrada ainda :(
            </p>
            <Link to="/cursos">
              <Button>Voltar</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
