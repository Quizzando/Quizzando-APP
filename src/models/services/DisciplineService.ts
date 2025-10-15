import type { Discipline, Quiz } from '@/@types'
import { API_BASE_URL } from '@/constants/api'
import { handleApiResponse } from '@/utils/handleApiResponse'

export const disciplineService = {
  async getDisciplines(): Promise<Discipline[] | null> {
    try {
      const data = await handleApiResponse<{ disciplines: Discipline[] }>(
        await fetch(`${API_BASE_URL}/discipline`),
      )

      return data.disciplines
    } catch (error) {
      console.error('Erro ao retornar disciplinas:', error)
      throw error
    }
  },
  async getDisciplineById(disciplineId: string): Promise<Discipline | null> {
    try {
      const discipline = await handleApiResponse<Discipline>(
        await fetch(`${API_BASE_URL}/discipline/${disciplineId}`),
      )

      return discipline
    } catch (error) {
      console.error('Erro ao retornar disciplina:', error)
      throw error
    }
  },
  async createCourse({
    courseId,
    disciplineName,
    description,
    // questions // descomentar quando o backend fizer as coisas direito
  }: Discipline): Promise<Discipline | null> {
    try {
      const newDiscipline = handleApiResponse<Discipline>(
        await fetch(`${API_BASE_URL}/discipline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId,
            disciplineName,
            description,
            // questions // descomentar quando o backend fizer as coisas direito
          }),
        }),
      )

      return newDiscipline
    } catch (error) {
      console.error('Erro ao criar nova disciplina:', error)
      throw error
    }
  },
  async generateQuiz(disciplineId: string): Promise<Quiz | null> {
    try {
      const generatedQuiz = await handleApiResponse<Quiz>(
        await fetch(`${API_BASE_URL}/course/quiz/${disciplineId}`),
      )

      return generatedQuiz
    } catch (error) {
      console.error('Erro ao gerar quiz:', error)
      throw error
    }
  },
}
