import { Link } from '@tanstack/react-router'

type AuthRedirectProps = {
    linkText: string
    to: string
    message?: string
}

export function AuthRedirect({ linkText, to, message}: AuthRedirectProps) {
  return (
    <p className="self-center text-xs">
      {message}{' '}
      <Link to={to} className="text-secondary hover:underline">
        {linkText}
      </Link>
    </p>
  )
}