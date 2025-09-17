import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createFileRoute } from '@tanstack/react-router'
import { Edit } from 'lucide-react'

export const Route = createFileRoute('/_app/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = Route.useRouteContext()
  const { user } = auth

  if (!user) {
    return <div>carregando...</div>
  }

  return (
    <div className="container max-w-5xl mx-auto min-h-screen p-10">
      <div className="flex flex-row items-center justify-around p-10 rounded-lg shadow-accent/40 shadow-lg">
        <div className="w-1/2 flex flex-col items-center space-y-5">
          <h1 className="text-5xl font-bold">{user?.username}</h1>
          <Avatar className="w-40 h-40 border-5 border-primary">
            <AvatarImage src={user?.pfp} />
            <AvatarFallback>
              {user?.username.slice(0, 1) + user?.username.slice(1, 2)}
            </AvatarFallback>
          </Avatar>
          <h2>Sua Pontuação</h2>
          <h3>{user?.score}</h3>
        </div>
        <div className="w-1/2 flex flex-col space-y-5">
          <h1 className="font-bold">Suas Informações</h1>
          <EditDialog
            label={'Apelido'}
            value={user?.username}
            type={'text'}
            onChange={() => {}}
          />
          <EditDialog
            label={'Email'}
            value={user?.email}
            type={'email'}
            onChange={() => {}}
          />
          <EditDialog
            label={'Senha'}
            value={user?.password ?? '1a2b3c4d'}
            type={'password'}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}

const EditDialog = ({
  label,
  type,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: string
  type: string
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="group relative cursor-pointer space-y-2">
          <Label>{label}</Label>
          <Input
            type="text"
            value={value}
            disabled
            className="shadow-xsmall transition-all shadow-accent/40 group-hover:-translate-y-[0.5px] group-hover:shadow-md"
          />
          <Edit className="text-muted-foreground h-5 w-5 absolute right-2 top-[50%] -translate-y-[25%] " />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja alterar {label}?</AlertDialogTitle>
          <AlertDialogDescription>
            Não se preocupe, essa ação é reversível.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Alterar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
