import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Clock } from '../-components/clock'

export const Route = createFileRoute(
  '/_app/cursos/$courseId/disciplina/$disciplineId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [seconds, setSeconds] = useState(0)
  const LIMIT = 30 // em segundos

  useEffect(() => {
    const tick = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    if (seconds - 1 === LIMIT) clearInterval(tick)

    return () => clearInterval(tick)
  }, [])

  return (
    <div className="max-w-5xl min-h-screen mx-auto flex flex-col items-center justify-start px-6 py-12 space-y-6">
      <Clock seconds={seconds} duration={LIMIT} size={64} />
    </div>
  )
}
