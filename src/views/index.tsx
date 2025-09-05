import { Button } from '@/components/ui/button'
import * as Card from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { FastForward, Palette, LucidePencil } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const features = [
    {
      name: 'Rápido',
      description: 'Apenas 5 perguntas para testar seus conhecimentos',
      icon: FastForward
    },
    {
      name: 'Personalizado',
      description: 'Questões divertidas que tornam o aprendizado mais leve',
      icon: Palette
    },
    {
      name: 'Prático',
      description: 'Ajuda a identificar onde você se destaca e pode melhorar.',
      icon: LucidePencil
    },
  ]


  return (
    <div className="flex flex-col items-center justify-center py-24">
      <section className=' container max-w-5xl mx-auto flex items-center justify-between'>
        <div className='flex flex-col space-y-6 max-w-1/2'>
          <h1 className="text-5xl font-bold">
            Quizzando - <span className="italic text-[#FF0080]">App</span>
          </h1>
          <h3>Aprender nunca foi tão interativo!</h3>
          <p>Prepare-se para testar seus conhecimentos de forma rápida e divertida. Responda às
            perguntas, avalie seu desempenho e descubra quais seus pontos fortes - e onde pode melhorar!
          </p>
          <Link to='/register'>
            <Button className='p-6 bg-[#FF0080]'>Cadastre-se para começar</Button>
          </Link>
        </div>

        <div className='bg-primary w-70 h-70 rounded-md' />
      </section>
      <Card.Card className='w-full max-w-5xl my-10'>
        <Card.CardContent className='flex items-center justify-around gap-6'>
          {features.map((f, i) => <Card.Card key={i}>
            <Card.CardTitle className='flex items-center self-center gap-4'><f.icon />{f.name}</Card.CardTitle>
            <Card.CardContent className='text-center'>{f.description}</Card.CardContent>
          </Card.Card>)}
        </Card.CardContent>
      </Card.Card>
      <section className='container max-w-5xl mx-auto flex items-center justify-between'>
        <div className='bg-primary w-70 h-70 rounded-md' />
        <div className='max-w-1/2 flex flex-col space-y-10'>
          <p>
            Que tal testar seus conhecimentos de um jeito divertido?
            Preparamos um quiz especial para você se desafiar, aprender e se divertir ao mesmo tempo.
          </p>
          <p>
            É simples: entre, responde e veja até onde consegue chegar, jogue sozinho ou desafie seus amigos.
          </p>
        </div>
      </section>
    </div>
  )
}
