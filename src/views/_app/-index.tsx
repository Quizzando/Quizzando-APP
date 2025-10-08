import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MOCK_COURSES } from '@/constants/mock'
import { useAuth } from '@/hooks/use-auth'
import { Link } from '@tanstack/react-router'

export function HomePage() {
  const { user } = useAuth()

  return (
    <>
      <Header />
      <div className="container max-w-5xl mx-auto min-h-screen space-y-10 py-6 ">
        <div>
          <h1 className="text-3xl font-bold">
            Olá, <span className="text-[#FF0080]">{user?.username}</span>!
          </h1>
          <p className="text-lg max-w-3xl mt-2 text-muted-foreground">
            Seja bem-vindo à tela inicial do Quizzando, aqui você pode
            selecionar em quais cursos você gostaria de testar suas habilidades.
          </p>
        </div>

        <div className="border-4 border-primary p-6 rounded-xl">
          <h1 className="text-3xl font-bold mb-6">Lista de Cursos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COURSES.map((c) => (
              <Link
                key={c.id}
                to={'/cursos/$courseId'}
                params={{ courseId: c.id! }}
                className="group"
              >
                <Card
                  className="
              transition-all duration-300 rounded-xl
              group-hover:scale-[1.02]
            "
                  style={{
                    boxShadow: `0 0 0 transparent`,
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.boxShadow =
                      `0 2px 10px 1px 80`
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.boxShadow =
                      `0 0 0 transparent`
                  }}
                >
                  <CardHeader className="flex justify-center text-4xl">
                    {c.icon as string}
                  </CardHeader>
                  <CardContent className="text-center font-medium">
                    {c.courseName}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
