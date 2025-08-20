import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        Quizzando - <span className="italic text-[#FF0080]">App</span>
      </h1>
    </div>
  )
}
