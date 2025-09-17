import { MOCK_COURSES } from '@/constants/mock'
import { createFileRoute } from '@tanstack/react-router'
import { CourseCard } from '@/components/CourseCard'

export const Route = createFileRoute('/_app/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = Route.useRouteContext()

  return (
    <div className="container max-w-5xl mx-auto min-h-screen space-y-10">
      <div>
        <h1 className="text-3xl font-bold">
          Olá, <span className="text-[#FF0080]">{auth.user?.username}</span>!
        </h1>
        <p className="text-lg max-w-3xl mt-2 text-muted-foreground">
          Seja bem-vindo à tela inicial do Quizzando, aqui você pode selecionar
          em quais cursos você gostaria de testar suas habilidades.
        </p>
      </div>

      <div className="border-4 border-primary p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-1">Lista de Cursos</h2>
        <p className="text-lg font-light text-muted-foreground text-pretty mb-2">
          Descubra novos conhecimentos e habilidades com nossos cursos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </div>
  )
}
