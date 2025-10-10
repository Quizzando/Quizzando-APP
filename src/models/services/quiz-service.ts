import { MOCK_QUESTIONS } from '@/constants/mock'
import type { Quiz } from '@/models/@types'
import { getToken } from '@/utils/token'

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
}
