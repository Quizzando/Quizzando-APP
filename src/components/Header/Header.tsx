import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { GradientText } from '../bits/GradientText'
import { useAuth } from '@/hooks/use-auth'
import * as Avatar from '../ui/avatar'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="py-2 px-10">
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

        {user ? (
          <Link to="/dashboard">
            <Avatar.Avatar className="w-12 h-12 border-3 border-primary">
              <Avatar.AvatarImage
                src={user.pfp}
                alt={`${user.username} profile`}
              />
              <Avatar.AvatarFallback>{user.username[0]}</Avatar.AvatarFallback>
            </Avatar.Avatar>
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
