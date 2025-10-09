import { MOCK_QUESTIONS } from '@/constants/mock'
import type { Course, Quiz } from '@/models/@types'
import { handleApiResponse } from '@/utils/handleApiResponse'
import { getToken } from '@/utils/token'
import type { CursoFormData } from '@/views/_app/criar/curso'

export const quizService = {
  async generateQuiz(disciplineId: string): Promise<Quiz | null> {
    try {
      const token = getToken()

      // const data = await handleApiResponse(
      //   await fetch(`/api/question/discipline/${disciplineId}`, {
      //     method: 'GET',
      //     headers: { Authorization: `Bearer ${token}` },
      //   }),
      // )

      // console.log(data)

      // === mockagem === //
      await new Promise((resolve) => setTimeout(resolve, 3000))

      return {
        id: disciplineId,
        courseId: '1a2b3c',
        disciplineName: 'Desenvolvimento de Sistemas',
        description: 'asdasdasdasdasdasd',
        questions: MOCK_QUESTIONS,
      } as Quiz
    } catch (error) {
      console.error('Erro ao gerar quiz:', error)
      throw error
    }
  },

  // === GET COURSES === //
  async getCourses(): Promise<Course[] | null> {
    try {
      return await handleApiResponse<Course[]>(
        await fetch(`/api/course`),
      )
    } catch (error) {
      console.error('Erro ao retornar cursos:', error)
      throw error
    }
  },

  // === CRIAR CURSO === //
    async createCourse({ name, backgroundImage, category, icon, rating }: CursoFormData): Promise<Course | null> {
      try {
        return await handleApiResponse<Course>(
          await fetch(`/api/course`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, backgroundImage, category, icon, rating }),
          }),
        )
      } catch (error) {
        console.error('Erro ao criar novo curso:', error)
        throw error
      }
    },
}
