import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'
import type { Discipline } from '@/models/@types'
import { Link } from '@tanstack/react-router'
import { AlertTriangle } from 'lucide-react'
import type { PropsWithChildren } from 'react'

interface StartQuizPopup {
  courseId: string
  discipline: Discipline
}

export function StartQuizPopup({
  courseId,
  discipline,
  children,
}: StartQuizPopup & PropsWithChildren) {
  const { user } = useAuth()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {user ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Atenção
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed pt-2">
                Ao clicar em prosseguir você estará iniciando um quiz sobre{' '}
                <span className="font-semibold text-foreground">
                  {discipline.name}
                </span>
                . Após o início, você não poderá deixar o quiz até terminá-lo.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <DialogClose asChild>
                <Button variant="outline">Voltar</Button>
              </DialogClose>
              <Link
                to="/cursos/$courseId/disciplina/$disciplineId"
                params={{ courseId: courseId, disciplineId: discipline.id! }}
              >
                <Button className="bg-primary hover:bg-primary/90">
                  Iniciar Quiz
                </Button>
              </Link>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Atenção
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed pt-2">
                Para inicar qualquer quiz da plataforma, você precisa{' '}
                <span className="text-primary font-bold">
                  registar uma conta
                </span>{' '}
                ou <span className="text-primary font-bold">estar logado</span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Link to="/login">
                <Button>Entrar</Button>
              </Link>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
