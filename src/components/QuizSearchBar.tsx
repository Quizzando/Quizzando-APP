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
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    curso: '',
    disciplina: '',
    dificuldade: '',
    tempoCreacao: '',
  })

  const cursos = [
    'Engenharia de Software',
    'Medicina',
    'Direito',
    'Administração',
    'Psicologia',
    'Arquitetura',
  ]

  const disciplinas = [
    'Algoritmos',
    'Anatomia',
    'Direito Civil',
    'Marketing',
    'Psicologia Cognitiva',
    'Projeto Arquitetônico',
  ]

  const dificuldades = ['Fácil', 'Médio', 'Difícil', 'Avançado']

  const temposCreacao = [
    'Última semana',
    'Último mês',
    'Últimos 3 meses',
    'Último ano',
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilter = (key: keyof SearchFilters) => {
    setFilters((prev) => ({ ...prev, [key]: '' }))
  }

  const clearAllFilters = () => {
    setFilters({
      curso: '',
      disciplina: '',
      dificuldade: '',
      tempoCreacao: '',
    })
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  const handleSearch = () => {
    console.log(
      '[v0] Searching with query:',
      searchQuery,
      'and filters:',
      filters,
    )
    // Aqui você implementaria a lógica de busca
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

          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative h-10 px-3 bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Filtros de Busca</h4>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Limpar todos
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      Curso
                    </label>
                    <Select
                      value={filters.curso}
                      onValueChange={(value) =>
                        handleFilterChange('curso', value)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecionar curso" />
                      </SelectTrigger>
                      <SelectContent>
                        {cursos.map((curso) => (
                          <SelectItem key={curso} value={curso}>
                            {curso}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      Disciplina
                    </label>
                    <Select
                      value={filters.disciplina}
                      onValueChange={(value) =>
                        handleFilterChange('disciplina', value)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecionar disciplina" />
                      </SelectTrigger>
                      <SelectContent>
                        {disciplinas.map((disciplina) => (
                          <SelectItem key={disciplina} value={disciplina}>
                            {disciplina}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      Dificuldade
                    </label>
                    <Select
                      value={filters.dificuldade}
                      onValueChange={(value) =>
                        handleFilterChange('dificuldade', value)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecionar dificuldade" />
                      </SelectTrigger>
                      <SelectContent>
                        {dificuldades.map((dificuldade) => (
                          <SelectItem key={dificuldade} value={dificuldade}>
                            {dificuldade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                      Tempo de Criação
                    </label>
                    <Select
                      value={filters.tempoCreacao}
                      onValueChange={(value) =>
                        handleFilterChange('tempoCreacao', value)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Selecionar período" />
                      </SelectTrigger>
                      <SelectContent>
                        {temposCreacao.map((tempo) => (
                          <SelectItem key={tempo} value={tempo}>
                            {tempo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Filtros ativos:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {filters.curso && (
                        <Badge variant="secondary" className="text-xs">
                          {filters.curso}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto w-auto p-0 ml-1 hover:bg-transparent"
                            onClick={() => clearFilter('curso')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      {filters.disciplina && (
                        <Badge variant="secondary" className="text-xs">
                          {filters.disciplina}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto w-auto p-0 ml-1 hover:bg-transparent"
                            onClick={() => clearFilter('disciplina')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      {filters.dificuldade && (
                        <Badge variant="secondary" className="text-xs">
                          {filters.dificuldade}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto w-auto p-0 ml-1 hover:bg-transparent"
                            onClick={() => clearFilter('dificuldade')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                      {filters.tempoCreacao && (
                        <Badge variant="secondary" className="text-xs">
                          {filters.tempoCreacao}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto w-auto p-0 ml-1 hover:bg-transparent"
                            onClick={() => clearFilter('tempoCreacao')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <Button onClick={handleSearch} className="w-full h-9">
                  Buscar Quizzes
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
