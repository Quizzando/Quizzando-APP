import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/sobre')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="max-w-5x mx-auto min-h-screen flex flex-col space-y-10 items-center justify-center">
      <h1 className="text-7xl font-bold">Dedicatória</h1>
      <p className="text-xl">
        página dedicada aos desenvolvedores do projetos Quizzando
      </p>
      <p>Em construção....</p>
      <Link to="/">
        <Button>Voltar</Button>
      </Link>
    </div>
  )
}
