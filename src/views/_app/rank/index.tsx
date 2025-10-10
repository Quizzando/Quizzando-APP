import { createFileRoute } from '@tanstack/react-router'
import { RankingTable } from "./-components/ranking-table"

export const Route = createFileRoute('/_app/rank/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
              Ranking de Usuários
            </h1>
            <p className="text-muted-foreground text-lg text-pretty">
              Confira os usuários com melhor desempenho na plataforma
            </p>
          </div>
          <RankingTable />
        </div>
      </div>
    </main>
  )
}
