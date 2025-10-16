import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

interface SearchFilters {
  curso: string
  disciplina: string
  dificuldade: string
  tempoCreacao: string
}

export function QuizSearchBar() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    console.log(
      '[v0] Searching with query:',
      searchQuery,
    )
  }

  return (
    <div className="flex-1 max-w-2xl mx-4">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-10 bg-background border-border focus:border-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
