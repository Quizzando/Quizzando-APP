import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { DISCIPLINES_KEY } from '@/constants/keys'
import { disciplineService } from '@/models/services/DisciplineService'
import type { Discipline } from '@/@types'
import { Link } from '@tanstack/react-router'

export function QuizSearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState<Discipline[] | null>(null)

  // === Fetch all disciplines once ===
  const { data: disciplines, isFetching } = useQuery({
    queryKey: [DISCIPLINES_KEY],
    queryFn: () => disciplineService.getDisciplines(),
  })

  // === Debounced search logic (applies only to filtering) ===
  const handleSearch = useDebouncedCallback((term: string) => {
    if (!term.trim()) {
      setFiltered(null)
      return
    }

    const results =
      disciplines?.filter((d) =>
        d.disciplineName.toLowerCase().includes(term.toLowerCase()),
      ) ?? []

    setFiltered(results)
  }, 300)

  // === Update search term immediately ===
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    handleSearch(term)
  }

  // === Hide modal when no results or no term ===
  const showResults = filtered && filtered.length > 0

  return (
    <div className="relative w-full px-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Buscar quizzes..."
          className="w-full pl-10 pr-4 h-10 bg-background border-border focus:border-primary"
        />
      </div>

      {/* === Results === */}
      {isFetching && (
        <div className="mt-2 text-sm text-muted-foreground">Carregando...</div>
      )}

      {showResults && (
        <ul className="max-h-[400px] overflow-y-scroll absolute top-16 left-0 w-full p-4 bg-card border-2 border-accent rounded-md shadow-md flex flex-col space-y-6">
          {filtered!.map((discipline) => (
            <li
              key={discipline.id}
              className="border-b-2 border-accent p-2 hover:shadow-lg"
            >
              <Link
                to="/cursos/$courseId"
                params={{ courseId: discipline.courseId }}
              >
                <p className="font-bold text-primary">
                  {discipline.disciplineName}
                </p>
                <p>{discipline.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
