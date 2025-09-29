import { createFileRoute } from '@tanstack/react-router'
import { CoursePicker } from './-components/course-picker'

export const Route = createFileRoute('/_app/criar/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex items-center flex-col py-20'>
      <h1>Bem vindo ao: '/_app/criar/'</h1>
      <br />
      <CoursePicker />
    </div>
  )
}
