import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Discipline } from '@/models/@types'
import { BookOpen } from 'lucide-react'
import { StartQuizPopup } from './startQuiz-popup'

interface DisciplineCardProps {
  discipline: Discipline
}

export function DisciplineCard({ discipline }: DisciplineCardProps) {
  const diff = Math.floor(Math.random() * 4)
  const difficulty = diff === 0 ? 'Fácil' : diff === 1 ? 'Médio' : 'Difícil'

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Médio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Difícil':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <StartQuizPopup courseId={discipline.courseId} discipline={discipline}>
      <Card
        key={discipline.id}
        className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          </div>

          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {discipline.disciplineName}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {discipline.description}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground"></div>
        </CardContent>
      </Card>
    </StartQuizPopup>
  )
}
