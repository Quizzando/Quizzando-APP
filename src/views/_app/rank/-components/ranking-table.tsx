import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Trophy, Medal, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

// Ranking Mockado
const rankingData = [
  {
    id: 1,
    name: 'Ana Silva',
    avatar: '/professional-woman-student.jpg',
    score: 9850,
    rank: 1,
  },
  {
    id: 2,
    name: 'Carlos Santos',
    avatar: '/professional-man-student.jpg',
    score: 9720,
    rank: 2,
  },
  {
    id: 3,
    name: 'Beatriz Costa',
    avatar: '/professional-woman-student-glasses.jpg',
    score: 9680,
    rank: 3,
  },
  {
    id: 4,
    name: 'Diego Oliveira',
    avatar: '/professional-man-student-beard.jpg',
    score: 9450,
    rank: 4,
  },
  {
    id: 5,
    name: 'Elena Rodrigues',
    avatar: '/professional-woman-student-smile.jpg',
    score: 9320,
    rank: 5,
  },
  {
    id: 6,
    name: 'Felipe Almeida',
    avatar: '/professional-man-student-casual.jpg',
    score: 9180,
    rank: 6,
  },
  {
    id: 7,
    name: 'Gabriela Lima',
    avatar: '/professional-woman-student-curly-hair.jpg',
    score: 9050,
    rank: 7,
  },
  {
    id: 8,
    name: 'Henrique Martins',
    avatar: '/professional-man-student-young.jpg',
    score: 8920,
    rank: 8,
  },
  {
    id: 9,
    name: 'Isabela Ferreira',
    avatar: '/professional-woman-student-professional.jpg',
    score: 8850,
    rank: 9,
  },
  {
    id: 10,
    name: 'João Pereira',
    avatar: '/professional-man-student-confident.jpg',
    score: 8720,
    rank: 10,
  },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-300" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-300" />
    case 3:
      return <Award className="h-6 w-6 text-amber-300" />
    default:
      return null
  }
}

function getRankBadgeColor(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
    case 2:
      return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
    case 3:
      return 'bg-gradient-to-br from-amber-500 to-amber-700 text-white'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export function RankingTable() {
  return (
    <div className="space-y-3">
      {rankingData.map((user, index) => {
        const isTopThree = user.rank <= 3

        return (
          <Card
            key={user.id}
            className={cn(
              'transition-all duration-200 hover:shadow-lg hover:scale-[1.01]',
              isTopThree &&
                'border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent',
            )}
          >
            <div className="flex items-center gap-4 p-4 md:p-6">
              {/* Rank Badge */}
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-lg',
                  getRankBadgeColor(user.rank),
                )}
              >
                
                {isTopThree ? getRankIcon(user.rank) : user.rank}
              </div>

              {/* Avatar */}
              <Avatar className="h-14 w-14 md:h-16 md:w-16 shrink-0 ring-2 ring-border">
                <AvatarImage
                  src={user.avatar || '/placeholder.svg'}
                  alt={user.name}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground truncate">
                  {user.name}
                </h3>
              </div>

              {/* Score */}
              <div className="text-right shrink-0">
                <div className="font-bold text-2xl text-primary">
                  {user.score.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-muted-foreground">pontos</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
