import { useAuth } from '@/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '@/views/_auth/-index'
import { HomePage } from '@/views/_app/-index'

export const Route = createFileRoute('/')({
  component: () => {
    const { user } = useAuth()
    return user ? <HomePage /> : <LandingPage />
  },
})
