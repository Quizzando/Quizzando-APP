import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { GradientText } from '../bits/GradientText'
import { useAuth } from '@/hooks/use-auth'
import * as Avatar from '../ui/avatar'
import { UserMenu } from '../UserMenu'
import { House,  Gamepad2, ChartBarStacked, CirclePlus} from 'lucide-react'
import { QuizSearchBar } from '@/components/QuizSearchBar'

export function Header() {
  const { user } = useAuth()

  const NAVITEMS = [
    {
      name: 'Home',
      href: '/',
      icon: <House className='stroke-[1.6px]' />,
    },
    {
      name: 'Jogar',
      href: '/courses',
      icon: <Gamepad2 className='stroke-[1.6px]' />,
    },
    // {
    //   name: 'Categories',
    //   href: '/categories',
    //   icon: <ChartBarStacked className='stroke-[1.6px]' />,
    // },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-1 px-2">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2 font-bold font-['Slackey'] text-background">
            {/* <h1 className="text-3xl font-bold font-['Slackey'] tracking-wider text-balance my-2.5">
              Quizzando
            </h1> */}
            <div className="bg-chart-4 p-3 rounded-sm transition-transform hover:-translate-y-1">
              QU
            </div>
            <div className="bg-chart-2 p-3 rounded-sm transition-transform hover:-translate-y-1">
              IZZ
            </div>
            <div className="bg-chart-5 p-3 rounded-sm transition-transform hover:-translate-y-1">
              AN
            </div>
            <div className="bg-chart-3 p-3 rounded-sm transition-transform hover:-translate-y-1">
              DO
            </div>
          </Link>

          {NAVITEMS.map((item) => (
            <Link key={item.href} to={item.href} className='flex gap-1 items-center text-foreground hover:text-primary font-medium transition-colors duration-200'>
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        <QuizSearchBar />

        <div className='flex items-center gap-1'>
          <Link to="/login">
            <Button variant="default" className='cursor-pointer hover:bg-accent'>
              <CirclePlus className='size-5' />
              Crie um Quiz
            </Button>
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
