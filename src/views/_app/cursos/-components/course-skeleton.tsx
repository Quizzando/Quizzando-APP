import { Skeleton } from '@/components/ui/skeleton'

export function CourseSkeleton() {
  return (
    <div className="flex flex-col">
      {/* === SEÇÃO DESCRITIVA === */}
      <section className="w-full flex flex-col md:flex-row items-center md:items-start space-x-6 px-6 py-4">
        {/* Imagem do curso */}
        <div className="relative max-w-1/2">
          <Skeleton className="h-96 w-180 rounded-xl" />
          <Skeleton className="absolute top-2 right-2 h-6 w-24 rounded-full" />
        </div>

        <div className="flex flex-col max-w-1/2 space-y-6 mt-4 md:mt-0">
          <div>
            <Skeleton className="h-8 w-64 mb-2" /> {/* Título */}
            <Skeleton className="h-4 w-20" /> {/* Rating */}
          </div>

          <h3 className="text-xl font-semibold">Visão Geral</h3>

          <div className="flex flex-col items-center justify-center md:flex-row md:justify-evenly p-6 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card p-8 rounded-lg flex flex-col items-center space-y-2 shadow-sm w-40"
              >
                <Skeleton className="h-6 w-6 rounded-full" /> {/* Ícone */}
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold">Descrição</h3>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </section>

      {/* === SEÇÃO DE DISCIPLINAS DO CURSO === */}
      <section className="w-full px-6 py-4">
        <div className="mb-8">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
            Disciplinas do Curso
          </h2>
          <p className="text-muted-foreground">
            Explore todas as disciplinas que compõem este curso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-card p-6 rounded-lg flex flex-col space-y-4 shadow-sm"
            >
              <Skeleton className="h-6 w-40" /> {/* Nome da disciplina */}
              <Skeleton className="h-4 w-3/4" /> {/* Subtexto */}
              <Skeleton className="h-24 w-full rounded-md" /> {/* Preview */}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
