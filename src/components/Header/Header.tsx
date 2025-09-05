import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { GradientText } from '../bits/GradientText'
import { useAuth } from '@/hooks/use-auth'
import * as Avatar from '../ui/avatar'

export function Header() {
  const { user } = useAuth()

  const NAVITEMS = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Jogar',
      href: '/courses',
    },
    {
      name: 'Categories',
      href: '/categories',
    },
  ]

  return (
    <header className=" py-1 px-10 ">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <GradientText
            colors={['#FF0080', '#7928CA']}
            showBorder
            className="p-2"
          >
            Quizzando
          </GradientText>
        </Link>

        {NAVITEMS.map((item) => (
          <Link key={item.href} to={item.href}>
            {item.name}
          </Link>
        ))}

        {user ? (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 p-1 rounded-md hover:bg-primary"
          >
            <Avatar.Avatar className="w-12 h-12 border-3 border-primary">
              <Avatar.AvatarImage
                src={user.pfp}
                alt={`${user.username} profile`}
              />
              <Avatar.AvatarFallback>{user.username[0]}</Avatar.AvatarFallback>
            </Avatar.Avatar>
            <p className="font-bold">{user.username}</p>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="outline">Entre</Button>
          </Link>
        )}
      </nav>
    </header>
  )
}
