import type { User } from "@/models/@types"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuShortcut } from "./ui/dropdown-menu"
import { Settings, Home, LogOut, Plus, User2 } from 'lucide-react'
import { Link } from "@tanstack/react-router"
import { useAuth } from "@/hooks/use-auth"

interface UserMenuProps {
    user: User
}

export const UserMenu = ({ user }: UserMenuProps) => {
    const { logout } = useAuth()

    const ACTIONS = [
        {
            label: 'Homepage',
            to: '/',
            icon: <Home />,
        },
        {
            label: 'Perfil',
            to: '/profile',
            icon: <User2 />,
        },
        {
            label: 'Configurações',
            to: '/settings',
            icon: <Settings />,
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex flex-row items-center gap-2 p-4 cursor-pointer">
                    <Avatar className="w-12 h-12 border-3 border-primary">
                        <AvatarImage
                            src={user.pfp}
                            alt={`${user.username} profile`}
                        />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-bold">{user.username}</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {ACTIONS.map((action, idx) =>
                        <Link to={action.to} key={idx}>
                            <DropdownMenuItem key={idx} >
                                {action.label}
                                <DropdownMenuShortcut>
                                    {action.icon}
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                    )}
                    {user.admin && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Área do Administrador</DropdownMenuLabel>
                            <Link to={"/"}>
                                <DropdownMenuItem>
                                    Criar
                                    <DropdownMenuShortcut>
                                        <Plus />
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                        </>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={logout}>
                    Sair
                    <DropdownMenuShortcut>
                        <LogOut />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}