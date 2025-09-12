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
    <header className=" py-2 px-8 shadow-md sticky z-1">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link to="/">
            <h1 className="text-3xl font-bold font-['Slackey'] tracking-wider text-balance my-2.5">
              Quizzando
            </h1>
          </Link>

          {NAVITEMS.map((item) => (
            <Link key={item.href} to={item.href} className='text-foreground hover:text-primary font-medium transition-colors duration-200'>
              {item.name}
            </Link>
          ))}
        </div>

        <div className='flex items-center gap-8'>
          <Link to="/login">
            <Button variant="default" className='cursor-pointer hover:bg-accent'>Crie um Quiz</Button>
          </Link>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link to="/login">
              <Button variant="outline" className='cursor-pointer'>Entre</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
