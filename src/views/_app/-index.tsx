import { CourseCard } from '@/components/CourseCard'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { COURSES_KEY } from '@/constants/keys'
import { useAuth } from '@/hooks/useAuth'
import { courseService } from '@/models/services/CourseService'
import { useQuery } from '@tanstack/react-query'

export function HomePage() {
  const { user } = useAuth()

  const { data, isPending } = useQuery({
    queryKey: [COURSES_KEY],
    queryFn: courseService.getCourses,
  })

  return (
    <>
      <Header />
      <div className="container max-w-5xl mx-auto min-h-screen space-y-10 py-6 ">
        <div>
          <h1 className="text-3xl font-bold">
            Olá, <span className="text-secondary">{user?.username}</span>!
          </h1>
          <p className="text-lg max-w-3xl mt-2 text-muted-foreground">
            Seja bem-vindo à tela inicial do Quizzando, aqui você pode
            selecionar em quais cursos você gostaria de testar suas habilidades.
          </p>
        </div>

        <div className="border-4 border-primary p-6 rounded-xl">
          <h1 className="text-3xl font-bold mb-6">Lista de Cursos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isPending || !data ? (
              <div>Loading...</div>
            ) : (
              data.map((c) => <CourseCard key={c.id} course={c} />)
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
