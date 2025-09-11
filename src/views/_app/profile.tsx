import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/profile')({
    component: RouteComponent
})

function RouteComponent() {
    const { auth } = Route.useRouteContext()
    const { user } = auth;

    return (
        <div className='container max-w-5xl mx-auto min-h-screen p-10'>
            <div>
                <h1 className='text-2xl'>{user?.username}</h1>
                <Avatar>
                    <AvatarImage src={user?.pfp} />
                    <AvatarFallback>{user?.username.slice(0, 1)! + user?.username.slice(1, 2)!}</AvatarFallback>
                </Avatar>
                <h2>Sua Pontuação</h2>
                <h3>{user?.score}</h3>
            </div>
            <div>
                <h1>Suas Informações</h1>
                <div>
                    <Label>Username</Label>
                    <Input type='text' value={user?.username} />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input type='email' value={user?.email} disabled />
                </div>
                <div className='relative'>
                    <Label>Senha</Label>
                    {/* O backend vai adicionar o campo senha mais tarde */}
                    <Input type='password' value={'*********'} disabled />
                </div>
            </div>
        </div>
    )
}
