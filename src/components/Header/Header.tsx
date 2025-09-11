import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { GradientText } from '../bits/GradientText'
import { useAuth } from '@/hooks/use-auth'
import * as Avatar from '../ui/avatar'
import { UserMenu } from '../UserMenu'

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
          <UserMenu user={user} />
        ) : (
          <Link to="/login">
            <Button variant="outline">Entre</Button>
          </Link>
        )}
      </nav>
    </header>
  )
}
