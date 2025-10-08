import { MOCK_COURSES } from '@/constants/mock'
import { createFileRoute } from '@tanstack/react-router'
import { CourseSkeleton } from './-components/course-skeleton'
import { CourseCard } from '@/components/CourseCard'
import { BookOpen } from 'lucide-react'
import type { Course } from '@/models/@types'

export const Route = createFileRoute('/_app/cursos/')({
  loader: async () => {
    // ... lógica de fetch dos cursos

    // const courses = MOCK_COURSES

    const response = await fetch('/api/course')
    const { courses } = await response.json()
    console.log(courses)

    return courses
  },
  pendingComponent: CourseSkeleton,
  component: RouteComponent,
})

function RouteComponent() {
  const courses: Course[] = Route.useLoaderData()

  if (!courses) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative container mx-auto px-6 py-16 text-center">
          <div>
            <BookOpen className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h1 className="mb-4 text-5xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Seleção de Cursos
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground text-pretty">
              Explore nossa coleção completa de cursos organizados por
              categoria. Encontre o conhecimento que você precisa para avançar
              em seus estudos.
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto flex flex-col space-y-6 py-12 px-6">
        <h1 className="text-3xl text-accent font-bold">
          Cursos do Ensino Técnico
        </h1>
        {courses
          .filter((c) => c.category === 0)
          .map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
      </section>
      <section className="max-w-4xl mx-auto flex flex-col space-y-6 py-12 px-6">
        <h1 className="text-3xl text-accent font-bold">
          Cursos do Ensino Médio
        </h1>
        {courses
          .filter((c) => c.category === 1)
          .map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
      </section>
    </div>
  )
}
