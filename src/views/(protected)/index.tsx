import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth' 

export const Route = createFileRoute('/(protected)/')({
  component: App,
})

function App() {
  const {user, token} = useAuth();

  return (
    <div>
      <h1>Hello world</h1>
      <p>{user}</p>
      <p>{token}</p>
    </div>
  )
}

