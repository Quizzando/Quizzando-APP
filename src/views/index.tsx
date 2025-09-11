import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FastForward, Palette, LucidePencil } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

export default function App() {
  const features = [
    {
      name: 'Rápido',
      description: 'Apenas 5 perguntas para testar seus conhecimentos',
      icon: <FastForward className="text-secondary" />,
    },
    {
      name: 'Personalizado',
      description: 'Questões divertidas que tornam o aprendizado mais leve',
      icon: <Palette className="text-secondary" />,
    },
    {
      name: 'Prático',
      description: 'Ajuda a identificar onde você se destaca e pode melhorar.',
      icon: <LucidePencil className="text-secondary" />,
    },
  ]

  return (
    <main className="flex flex-col">
      <section className="relative w-full min-h-screen bg-gradient-to-b from-primary to-accent shadow-lg pb-20">
        <div className="container max-w-5xl mx-auto px-4 py-16 md:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
            <div className="flex flex-col space-y-6 max-w-full lg:max-w-[50%]">
              <h1 className="text-4xl md:text-5xl font-bold font-['Slackey'] tracking-wider text-balance">
                Quizzando
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-pretty">
                Aprender nunca foi tão interativo!
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-pretty">
                Prepare-se para testar seus conhecimentos de forma rápida e
                divertida. Responda às perguntas, avalie seu desempenho e
                descubra quais seus pontos fortes - e onde pode melhorar!
              </p>
              <Link to="/register" className="w-fit">
                <Button className="p-8 text-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  Cadastre-se para começar
                </Button>
              </Link>
            </div>

            <div className="flex-shrink-0">
              <img
                src="/hero.svg"
                alt="Ilustração de pessoas fazendo quiz interativo"
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-20 md:-bottom-32 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
          <Card className="bg-background/95 backdrop-blur-sm border shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:shadow-primary/20 border-0 bg-background/50"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 rounded-lg bg-secondary/10">
                          {feature.icon}
                        </div>
                        <span className="text-accent font-semibold">
                          {feature.name}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container max-w-5xl mx-auto px-4 py-24 md:py-32 mt-16 md:mt-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-4 w-80 h-80">
              <div className="w-36 h-36 bg-chart-4 rounded-lg flex items-center justify-center text-white text-4xl font-['Slackey'] font-bold shadow-lg">
                Qu
              </div>
              <div className="w-36 h-36 bg-chart-2 rounded-lg flex items-center justify-center text-white text-4xl font-['Slackey'] font-bold shadow-lg">
                iz
              </div>
              <div className="w-36 h-36 bg-chart-5 rounded-lg flex items-center justify-center text-white text-4xl font-['Slackey'] font-bold shadow-lg">
                zan
              </div>
              <div className="w-36 h-36 bg-chart-3 rounded-lg flex items-center justify-center text-white text-4xl font-['Slackey'] font-bold shadow-lg">
                do
              </div>
            </div>
          </div>

          <div className="max-w-full lg:max-w-[50%] flex flex-col space-y-6">
            <p className="text-lg leading-relaxed text-pretty text-foreground">
              Que tal testar seus conhecimentos de um jeito divertido?
              Preparamos um quiz especial para você se desafiar, aprender e se
              divertir ao mesmo tempo.
            </p>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              É simples: entre, responda e veja até onde consegue chegar, jogue
              sozinho ou desafie seus amigos.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
