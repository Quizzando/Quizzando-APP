import { MOCK_QUESTIONS } from '@/constants/mock'
import type { Quiz } from '@/models/@types'
import { handleApiResponse } from '@/utils/handleApiResponse'

export const quizService = {
  async generateQuiz(disciplineId: string): Promise<Quiz | null> {
    try {
      // === mockagem === //
      await new Promise((resolve) => setTimeout(resolve, 3000))

      return {
        id: disciplineId,
        courseId: '1a2b3c',
        name: 'Desenvolvimento de Sistemas',
        difficulty: 0,
        questions: MOCK_QUESTIONS,
      } as Quiz
    } catch (error) {
      console.error('Erro ao gerar quiz:', error)
      throw error
    }
  },
}
