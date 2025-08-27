import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { GradientText } from '../bits/GradientText'

export function Header() {
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

        <Link to="/login">
          <Button variant="outline">Entre</Button>
        </Link>
      </nav>
    </header>
  )
}
