import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Undo2 } from 'lucide-react'

export function NotFound() {
  return (
    <div className="max-w-5x mx-auto min-h-screen flex flex-col space-y-10 items-center justify-center">
      <h1 className="text-7xl font-bold">Uh oh...</h1>
      <p className="text-xl">Tá perdido, amigo? Não tem nada por aqui, não</p>
      <Link to="/">
        <Button>
          <p>Voltar</p>
          <Undo2 className="animate-bounce" />
        </Button>
      </Link>
    </div>
  )
}
