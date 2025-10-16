import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Trophy, Medal, Award } from 'lucide-react'
import { cn } from '@/lib/utils'
import { rankingService } from '@/models/services/RankingService'
import { useQuery } from '@tanstack/react-query'
import { RANKING_KEY } from '@/constants/keys'
import { useEffect, useState } from 'react'
import type { UserRanking } from '@/models/services/RankingService'

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
  const { data } = useQuery({
    queryKey: [RANKING_KEY],
    queryFn: () => rankingService.getRanking(1, 10),
  })
  const [listUsers, setListUsers] = useState([] as UserRanking[] | null)
  useEffect(() => {
    if (data?.items) {
      setListUsers(data.items)
    }
  })

  return (
    <div className="space-y-3">
      {listUsers?.map((user, index) => {
        const isTopThree = index <= 2 // Top 3 usuários

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
                  getRankBadgeColor(index + 1),
                )}
              >
                {isTopThree ? getRankIcon(index + 1) : index + 1}
              </div>

              {/* Avatar */}
              <Avatar className="h-14 w-14 md:h-16 md:w-16 shrink-0 ring-2 ring-border">
                <AvatarImage
                  // src={user.avatar || '/placeholder.svg'}
                  src="/placeholder.svg"
                  alt={user.username}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.username
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground truncate">
                  {user.username}
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
