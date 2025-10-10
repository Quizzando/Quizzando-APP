import { createFileRoute } from '@tanstack/react-router'
import { CourseSkeleton } from './-components/course-skeleton'
import { CourseCard } from '@/components/CourseCard'
import { BookOpen } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { courseService } from '@/models/services/CourseService'

export const Route = createFileRoute('/_app/cursos/')({
  pendingComponent: CourseSkeleton,
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: courses,
    isPending,
    error,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: courseService.getCourses,
  })

  if (isPending || !courses) return <CourseSkeleton />
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive">
            Houve um erro ao carregar os cursos.
          </p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 mb-6">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Seleção de Cursos
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
              Explore nossa coleção completa de cursos organizados por
              categoria. Encontre o conhecimento que você precisa para avançar
              em seus estudos.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">
            Cursos do Ensino Técnico
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses
              .filter((c) => c.category === 0)
              .map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">
            Cursos do Ensino Médio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses
              .filter((c) => c.category === 1)
              .map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
